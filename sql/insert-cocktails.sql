
INSERT INTO
  cocktails
    (title, instructions, about_cocktail, imageURL, cocktail_type, difficulty)
  VALUES
    (
      'Gimlet', 
      'Add all the ingredients into a shaker with ice and shake.'||chr(10)||'Strain into a chilled cocktail glass.'||chr(10)||'Garnish with a lime wheel.',
      'A gimlet is a simple classic cocktail made from gin and lime juice, typically Rose’s Lime Juice.  It can also be made with vodka and many versions also add fresh lime in addition to Rose’s.  The gimlet rose to popularity after it was mentioned in the 1953 Raymond Chandler novel The Long Goodbye.  The main character, Philip Marlowe, said, “A real gimlet is half gin and half Rose’s Lime Juice and nothing else.  It beats martinis hollow.”  This line secured the gimlets place in history.\n In this recipe there is added Symple syrup because we all know sweet and sour is the best mixture.',
      'https://images.unsplash.com/photo-1549746423-e5fe9cafded8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      'Sour',
      'Easy'
    );

INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (1, 2, '1 ½ oz');
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (1, 33, '1 oz');
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (1, 46, '1 oz');
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (1, 35, 'Garnish');

INSERT INTO cocktailsEquipments (cocktail_id, equipment_id) VALUES (1, 2);
INSERT INTO cocktailsEquipments (cocktail_id, equipment_id) VALUES (1, 3);
INSERT INTO cocktailsEquipments (cocktail_id, equipment_id) VALUES (1, 4);
INSERT INTO cocktailsEquipments (cocktail_id, equipment_id) VALUES (1, 7);
INSERT INTO cocktailsEquipments (cocktail_id, equipment_id) VALUES (1, 9);
INSERT INTO cocktailsEquipments (cocktail_id, equipment_id) VALUES (1, 8);

INSERT INTO
  cocktails
    (title, instructions, about_cocktail, imageURL, cocktail_type, difficulty)
  VALUES
    (
      'Screwdriver', 
      'Add the vodka into a highball glass over ice.'||chr(10)||'Top with the orange juice.',
      'One of the first vodka-based cocktails, the screwdriver, is made from two ingredients. Decades ago, American oil workers in the Persian Gulf discreetly added vodka to their orange juice while on the job.Lacking a spoon, the workers decided to stir the drink with a screwdriver.',
      'https://images.unsplash.com/photo-1541546006121-5c3bc5e8c7b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80',
      'Sweet',
      'Easy' 
    );
  
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (2, 1, '1 ½ oz');
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id) VALUES (2, 49);

INSERT INTO cocktailsEquipments (cocktail_id, equipment_id) VALUES (2, 14);
INSERT INTO cocktailsEquipments (cocktail_id, equipment_id) VALUES (2, 15);

INSERT INTO
  cocktails
    (title, instructions, about_cocktail, imageURL, cocktail_type, difficulty)
  VALUES
    (
      'Basil Gimlet',
      'Pour the Simple syrup and the basil leaves in a cocktail shaker or mason jar, gently muddle the basil leaves.'||chr(10)||'Fill with ice, add lime juice and gin.'||chr(10)||'Shake well.'||chr(10)||'Strain into a martini glass.'||chr(10)||'Add Basil leave and pepper for garnish.',
      'A gimlet is a simple classic cocktail made from gin and lime juice. Basils spicy flavor puts a fresh spin on the traditional gimlet.',
      'https://images.unsplash.com/photo-1541807120430-f3f78c281225?ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&q=80',
      'Sour',
      'Normal'
    );

INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (3, 33, '1 oz');
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (3, 38, 'ca 10 leaves');
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (3, 46, '1 oz or a 1 ½ lime');
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (3, 2, '1 ½ oz');
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id) VALUES (3, 37);
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id) VALUES (3, 36);
INSERT INTO cocktailsIngredients (cocktail_id, ingredient_id, quantity) VALUES (3, 38, '1 for garnish');

INSERT INTO cocktailsEquipments (cocktail_id, equipment_id) VALUES (3, 2);
INSERT INTO cocktailsEquipments (cocktail_id, equipment_id) VALUES (3, 3);
INSERT INTO cocktailsEquipments (cocktail_id, equipment_id) VALUES (3, 4);
INSERT INTO cocktailsEquipments (cocktail_id, equipment_id) VALUES (3, 9);
INSERT INTO cocktailsEquipments (cocktail_id, equipment_id) VALUES (3, 6);
INSERT INTO cocktailsEquipments (cocktail_id, equipment_id) VALUES (3, 7);