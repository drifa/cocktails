const { query } = require('../utils/db');

// =========
//    GET
// =========

async function getIngredientDB(id) {
  return await query('SELECT * FROM ingredients WHERE id=$1;', [id]);
}

async function getIngredient(req, res) {
  const { id } = req.params;
  res.json(await getIngredientDB(id));
}

async function getAllIngredientsDB(queryString) {
  return await query('SELECT * FROM ingredients WHERE title ILIKE $1;', ['%'+queryString+'%']);
}

async function getAllIngredients(req, res) {
  if (typeof req.query.query != 'undefined') {
    const result = await getAllIngredientsDB(req.query.query);
    res.json({
      count: result.rowCount,
      items: result.rows
    });
  } else {
    const result = await getAllIngredientsDB('');
    res.json({
      count: result.rowCount,
      items: result.rows
    });
  }
}

// ==========
//    POST
// ==========

async function createIngredientDB(title) {
  const result = await query('INSERT INTO ingredients (title) VALUES ($1) RETURNING id, title;', [title]);
  return result.rows[0];
}

async function createIngredient(req, res) {  
  res.json(await createIngredientDB(req.body.title));
}

module.exports = {
  getIngredient,
  createIngredient,
  getAllIngredients,
};