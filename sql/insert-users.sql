
INSERT INTO 
  users 
    (username, email, password, admin) 
  VALUES 
    ('drifasoley', 'drifasoley@gmail.com', '$2b$11$8dNEzjB30bjkc5ZenvhdbeAihVnImwFKbht8pPEmdSIgoMsAoYnkq', true);

INSERT INTO 
  users 
    (username, email, password, admin) 
  VALUES 
    ('johnDoe', 'johnDoe@test.com', '$2b$11$VOc45FEfnFnhgDmx2GobD.ThCQlaBBRfjj8V1sak14AmuQ510U9Kq', false);

INSERT INTO usersCocktails (user_id, cocktail_id) VALUES (1, 1);
INSERT INTO usersCocktails (user_id, cocktail_id) VALUES (1, 2);