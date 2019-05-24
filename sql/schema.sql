CREATE TABLE cocktails (
  id SERIAL PRIMARY KEY,
  title VARCHAR(256) NOT NULL UNIQUE,
  instructions text,
  about_cocktail text,
  imageURL VARCHAR(256) DEFAULT NULL,
  cocktail_type VARCHAR(256) NOT NULL,
  difficulty VARCHAR(256) NOT NULL,
  created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
);

CREATE TABLE equipments (
  id SERIAL PRIMARY KEY,
  title VARCHAR(256) NOT NULL UNIQUE
);

CREATE TABLE cocktailsEquipments (
  cocktail_id INTEGER REFERENCES cocktails(id) NOT NULL,
  equipment_id INTEGER REFERENCES equipments(id) NOT NULL
);

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  title VARCHAR(256) NOT NULL UNIQUE
);

CREATE TABLE cocktailsIngredients (
  cocktail_id INTEGER REFERENCES cocktails(id) NOT NULL,
  ingredient_id INTEGER REFERENCES ingredients(id) NOT NULL,
  quantity VARCHAR(256)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(256) NOT NULL UNIQUE,
  email VARCHAR(256) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL,
  admin BOOLEAN DEFAULT false,
  created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
);

CREATE TABLE usersCocktails (
  user_id INTEGER REFERENCES users(id) NOT NULL,
  cocktail_id INTEGER REFERENCES cocktails(id) NOT NULL
);