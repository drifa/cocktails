const express = require('express');
const catchErrors = require('../utils/catchErrors');
const { requireAuth, checkUserIsAdmin } = require('../authentication/auth');

const requireAdmin = [
  requireAuth,
  checkUserIsAdmin,
];

const { 
  getCocktail, 
  createCocktail, 
  getAllCocktails,
  uploadCocktailImage,
} = require('./cocktails');
  
const {
  getIngredient,
  createIngredient,
  getAllIngredients
} = require('./ingredients');
  
const { 
  getUser, 
  getAllUsers, 
  createUser 
} = require('./users');

const router = express.Router();

router.get('/cocktails', catchErrors(getAllCocktails));
router.get('/cocktails/:id', catchErrors(getCocktail));
router.post('/cocktails', requireAuth, catchErrors(createCocktail));
router.post('/cocktails/upload', requireAuth, catchErrors(uploadCocktailImage));

router.get('/ingredients/:id', catchErrors(getIngredient));
router.post('/ingredients', catchErrors(createIngredient));
router.get('/ingredients', catchErrors(getAllIngredients));

router.get('/users', catchErrors(getAllUsers));
router.get('/users/me', requireAuth, catchErrors(getUser));
router.get('/users/:id', catchErrors(getUser));
router.post('/user', catchErrors(createUser));

module.exports = router;