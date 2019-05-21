const { query } = require('../utils/db');

require('dotenv').config();

const requireEnv = require('../utils/requireEnv');
requireEnv(['CLOUDINARY_URL']);

const cloudinary = require('cloudinary');
const multer = require('multer');

// cloudinary.config({ 
//   cloud_name: 'dsh94', 
//   api_key: '152861892514944', 
//   api_secret: 'lng0I8hJ0v4t9tP4e8KmvlVjsuM' 
// });

const MIMETYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
];

// ====================
//   HELPER FUNCTIONS
// ====================

function validateImageMimetype(mimetype) {
  return MIMETYPES.indexOf(mimetype.toLowerCase()) >= 0;
}

async function _getIngredientsForCocktailDB(cocktail_id) {
  const result = await query('SELECT i.id, i.title, c.quantity FROM ingredients i JOIN cocktailsIngredients c ON i.id = c.ingredient_id AND c.cocktail_id = $1;', [cocktail_id]);
  return result.rows;
}

async function withMulter(req, res, next, fn) {
  multer({ dest: './temp' })
    .single('image')(req, res, (err) => {
      if (err) {
        if (err.message === 'Unexpected field') {
          const errors = [{
            field: 'image',
            error: 'Unable to read image',
          }];
          return res.status(400).json({ errors });
        }

        return next(err);
      }

      return fn(req, res, next).catch(next);
    });
}

// =========
//    GET
// =========

async function getCocktailDB(id) {
    const ingredients = await _getIngredientsForCocktailDB(id);

    const result = await query('SELECT * FROM cocktails WHERE id=$1;', [id]);
    let cocktail = result.rows[0];
    cocktail.ingredients = ingredients;
    return cocktail;
}

async function getCocktail(req, res) {
  const { id } = req.params;
  res.json(await getCocktailDB(id));
}

async function getAllCocktailsDB(q) {
  return await query('SELECT * FROM cocktails WHERE title ILIKE $1;', ['%'+q+'%']);
}

async function getAllCocktails(req, res) {
  let result;
  if (typeof req.query.query != 'undefined') {
    result = await getAllCocktailsDB(req.query.query);
  } else {
    result = await getAllCocktailsDB('');
  }

  res.json(result.rows);
}

// ==========
//    POST
// ==========

async function createCocktailDB(userID, title, instructions, cocktailIngredients, image, type, difficulty) {

    const result = await query('INSERT INTO cocktails (title, instructions, imageURL, cocktail_type, difficulty) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [title, instructions, image, type, difficulty]);
    const cocktail = result.rows[0];

    for (let i=0; i<cocktailIngredients.length; i++) {
        await query('INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES ($1, $2, $3);', [cocktail.id, cocktailIngredients[i].id, cocktailIngredients[i].quantity]);
    }
    
    await query('INSERT INTO usersCocktails (user_id, cocktail_id) VALUES ($1, $2);', [userID, cocktail.id]);

    return await getCocktailDB(cocktail.id);
}

async function _uploadCocktailImage(req, res) {
  // file er tómt ef engri var uploadað
  const { file: { path, mimetype } = {} } = req;

  const hasImage = Boolean(path && mimetype);

  const validations = [];

  if (!hasImage) {
    return res.status(400).json({ errors: [{
      field: 'image',
      error: 'No image found in request',
    }] });
  }

  if (!validateImageMimetype(mimetype)) {
    validations.push({
      field: 'image',
      error: `Mimetype ${mimetype} is not legal. ` +
              `Only ${MIMETYPES.join(', ')} are accepted`,
    });
  }

  if (validations.length > 0) {
    return res.status(400).json({
      errors: validations,
    });
  }

  // Aðeins ef allt er löglegt uploadum við mynd
  let upload = null;
  try {
    upload = await cloudinary.uploader.upload(path);
  } catch (err) {
    // Skilum áfram villu frá Cloudinary, ef einhver
    if (err.http_code && error.http_code === 400) {
      return res.status(400).json({ errors: [{
        field: 'image',
        error: error.message,
      }] });
    }

    return res.status(500).json({ errors: [{
      field: 'image',
      error: `Unable to upload file to cloudinary: ${err}`,
    }] });
  }

  if (!upload || !upload.secure_url) {
    return res.status(500).json({ errors: [{
      field: 'image',
      error: 'Upload failed',
    }] });
  }

  res.json({
    url: upload.secure_url,
  });
}

async function createCocktail(req, res) {
  const body = req.body;
  const cocktail = await createCocktailDB(req.user.id, body.title, body.instructions, body.ingredients, body.image, body.type, body.difficulty);
  res.json(cocktail);
}

async function uploadCocktailImage(req, res, next) {
  return withMulter(req, res, next, _uploadCocktailImage);
}

module.exports = {
    getCocktail,
    getCocktailDB,
    getAllCocktails,
    createCocktail,
    uploadCocktailImage,
};