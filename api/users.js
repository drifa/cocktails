const { query } = require('../utils/db');
const { getCocktailDB: getCocktail } = require('./cocktails')

// =========
//    GET
// =========

async function getUsersCocktailsDB(user_id) {
  return await query('SELECT cocktail_id FROM usersCocktails WHERE user_id=$1;', [user_id])
}

async function getUserDB(id) {
  const cocktailsResult = await getUsersCocktailsDB(id);
  const cocktailIDs = cocktailsResult.rows.map(result => result.cocktail_id);

  const cocktails = await Promise.all(cocktailIDs.map(id => getCocktail(id)));
  const result = await query('SELECT * FROM users WHERE id=$1;', [id]);
  let user = result.rows[0];
  user.cocktails = cocktails;
  return user;
}

async function getUser(req, res) {
  let { id } = req.params;
  if (req.user) {
    id = req.user.id;
  }
  res.json(await getUserDB(id));
}

async function getAllUsersDB(query) {
  return await query('SELECT * FROM users WHERE username ILIKE $1;', ['%'+query+'%']);
}

async function getAllUsers(req, res) {
  if (typeof req.query.query != 'undefined') {
    res.json(await getAllUsersDB(req.query.query));
  } else {
    res.json(await getAllUsersDB(''));
  }
}

// ==========
//    POST
// ==========

async function createUserDB(username, email) {
    return await query('INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *;', [username, email]);
}

async function createUser(req, res) {
    const body = req.body;
    res.json(await createUserDB(body.username, body.email));
  }

module.exports = {
    getUser,
    createUser,
    getAllUsers,
};