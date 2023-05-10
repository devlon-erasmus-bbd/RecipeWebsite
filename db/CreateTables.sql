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

CREATE TABLE Recipes (
    recipe_id int PRIMARY KEY IDENTITY(1, 1),
    recipe_name varchar(50),
	user_id int,
    category_id int,
	instructions varchar(5000),
	picture_location varchar(1000),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id),
	FOREIGN KEY (user_id) REFERENCES Users(user_id)
)

CREATE TABLE RecipeIngredients (
    recipe_id int,
    ingredient_id int,
    measurement varchar(50),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id),
)