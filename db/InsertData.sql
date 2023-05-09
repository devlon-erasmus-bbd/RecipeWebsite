USE RecipeDB
GO

INSERT INTO Users (username)
VALUES ('bob')

INSERT INTO Ingredients (ingredient_name)
VALUES ('egg'), ('butter')

INSERT INTO Categories (category)
VALUES ('vegetarian'), ('chicken'), ('vegan'), ('beef'), ('asian')

INSERT INTO MeasurementTypes (measurement_type)
VALUES ('number'), ('ml'), ('Litres'), ('grams')

INSERT INTO Recipes (recipe_name, category_id, instructions, picture_location)
VALUES ('Fried Egg', 1, 'Heat pan, put butter in pan, let it melt, crack egg into pan, cook for 4min.', null)

INSERT INTO RecipeIngredients (recipe_id, ingredient_id, amount, measurement_type_id)
VALUES (1, 1, 1, 1), (1, 2, 20, 2)

INSERT INTO RecipeCategories (recipe_id, category_id)
VALUES (1, 1)
