USE RecipeDB
GO

INSERT INTO Users (username)
VALUES ('bob'), ('TheMealDB')

INSERT INTO Ingredients (ingredient_name)
VALUES ('egg'), ('butter')

INSERT INTO Categories (category)
VALUES ('vegetarian'), ('chicken'), ('vegan'), ('beef'), ('asian')

INSERT INTO Recipes (recipe_name, user_id, category_id, instructions, picture_location)
VALUES ('Fried Egg', 1, 1, 'Heat pan, put butter in pan, let it melt, crack egg into pan, cook for 4min.', null)

INSERT INTO RecipeIngredients (recipe_id, ingredient_id, measurement)
VALUES (1, 1, '1'), (1, 2, '20g')

