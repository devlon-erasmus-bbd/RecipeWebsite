USE master
GO

DROP DATABASE IF EXISTS RecipeDB
GO

CREATE DATABASE RecipeDB
GO

USE RecipeDB
GO

CREATE TABLE Users (
    user_id int PRIMARY KEY IDENTITY(1, 1),
    username varchar(50)
)

CREATE TABLE Ingredients (
    ingredient_id int PRIMARY KEY IDENTITY(1, 1),
    ingredient_name varchar(50)
)

CREATE TABLE Categories (
    category_id int PRIMARY KEY IDENTITY(1, 1),
    category varchar(50)
)

CREATE TABLE MeasurementTypes (
    measurement_type_id int PRIMARY KEY IDENTITY(1, 1),
    measurement_type varchar(50)
)

CREATE TABLE Recipes (
    recipe_id int PRIMARY KEY IDENTITY(1, 1),
    recipe_name varchar(50),
    category_id int,
	instructions varchar(500),
	picture_location varchar(100),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
)

CREATE TABLE RecipeIngredients (
    recipe_id int,
    ingredient_id int,
    amount float,
    measurement_type_id int,
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id),
    FOREIGN KEY (measurement_type_id) REFERENCES MeasurementTypes(measurement_type_id)
)

CREATE TABLE RecipeCategories (
	recipe_id int,
	category_id int,
	FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
	FOREIGN KEY (category_id) REFERENCES Categories(category_id)
)