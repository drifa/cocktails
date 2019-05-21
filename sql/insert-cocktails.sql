
INSERT INTO
  cocktails
    (title, instructions, imageURL, cocktail_type, difficulty)
  VALUES
    (
      'Vodka Gimlet', 
      'Add all the ingredients into a shaker with ice and shake.\nStrain into a chilled cocktail glass.\nGarnish with a lime wheel.',
      'https://images.unsplash.com/photo-1549746423-e5fe9cafded8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      'Sour',
      'Easy'
    );

INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (1, 1, '2 ½ oz');
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (1, 2, '½ oz');
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (1, 3, '½ oz');
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (1, 4, 'Garnish');

INSERT INTO
  cocktails
    (title, instructions, imageURL, cocktail_type, difficulty)
  VALUES
    (
      'Screwdriver', 
      'Add the vodka into a highball glass over ice.\nTop with the orange juice.',
      'https://images.unsplash.com/photo-1541546006121-5c3bc5e8c7b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80',
      'Sweet',
      'Easy' 
    );
  
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (2, 1, '1 ½ oz');
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id) VALUES (2, 5);

INSERT INTO
  cocktails
    (title, instructions, imageURL, cocktail_type, difficulty)
  VALUES
    (
      'Basil Gimlet', 
      'Pour the Simple syrup and the basil leaves in a cocktail shaker or mason jar, gently muddle the basil leaves.\nFill with ice, add lime juice and gin.\nShake well.\nStrain into a martini glass.\nAdd Basil leave and pepper for garnish',
      'https://images.unsplash.com/photo-1541807120430-f3f78c281225?ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&q=80',
      'Sour',
      'Normal'
    );

INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (3, 3, '1 oz');
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (3, 9, 'ca 10 leaves');
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (3, 2, '1 oz or a 1 ½ lime');
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (3, 6, '1 ½ oz');
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id) VALUES (3, 8);
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id) VALUES (3, 7);
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (3, 9, '1 for garnish');
