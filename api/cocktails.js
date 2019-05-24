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

async function _getEquipmentsForCocktailDB(cocktail_id) {
  const result = await query('SELECT i.id, i.title FROM equipments i JOIN cocktailsEquipments c ON i.id = c.equipment_id AND c.cocktail_id = $1;', [cocktail_id]);
  return result.rows;
}


async function _getCocktailAuthor(cocktail_id) {
  const result = await query('SELECT user_id FROM usersCocktails WHERE cocktail_id=$1;', [cocktail_id]);
  return result.rows[0];
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
    const equipments = await _getEquipmentsForCocktailDB(id);
    const author = await _getCocktailAuthor(id);

    const result = await query('SELECT * FROM cocktails WHERE id=$1;', [id]);
    let cocktail = result.rows[0];
    cocktail.author = author;
    cocktail.ingredients = ingredients;
    cocktail.equipments = equipments;
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

async function createCocktailDB(userID, title, instructions, about_cocktail, cocktailIngredients, cocktailEquipments, image, type, difficulty) {

    const result = await query('INSERT INTO cocktails (title, instructions, about_cocktail, imageURL, cocktail_type, difficulty) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [title, instructions, about_cocktail, image, type, difficulty]);
    const cocktail = result.rows[0];

    for (let i=0; i<cocktailIngredients.length; i++) {
        await query('INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES ($1, $2, $3);', [cocktail.id, cocktailIngredients[i].id, cocktailIngredients[i].quantity]);
    }

    for (let i=0; i<cocktailEquipments.length; i++) {
      await query('INSERT INTO cocktailsEquipments (cocktail_id, equipment_id) VALUES ($1, $2);', [cocktail.id, cocktailEquipments[i].id]);
  }
    
    await query('INSERT INTO usersCocktails (user_id, cocktail_id) VALUES ($1, $2);', [userID, cocktail.id]);

    return await getCocktailDB(cocktail.id);
}

async function _uploadCocktailImage(req, res) {
  // file er tómt ef engri var uploadað
  const { file: { path, mimetype, author } = {} } = req;

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
    user: req.user,
  });
}

async function createCocktail(req, res) {
  const body = req.body;
  const cocktail = await createCocktailDB(req.user.id, body.title, body.instructions, body.about_cocktail, body.ingredients, body.equipments, body.image, body.type, body.difficulty);
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