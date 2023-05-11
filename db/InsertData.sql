USE RecipeDB
GO

INSERT INTO Users (username,firstname,lastname,email,hashedpassword)
VALUES ('bob','robert','cold','cold@gmail.com','$2a$12$P/X7QhAFm0UqwgVrAiFjb.TJXYRzikgssDIgTVpaoyz7YiVBvnqD6'), 
('TheMealDB','tom','jerry','jerry@gmail.com','$2a$12$P/X7QhAFm0UqwgVrAiFjb.TJXYRzikgssDIgTVpaoyz7YiVBvnqD6')

INSERT INTO Ingredients (ingredient_name)
VALUES ('egg'), ('butter')

INSERT INTO Categories (category)
VALUES ('vegetarian'), ('chicken'), ('vegan'), ('beef'), ('asian')

INSERT INTO Recipes (recipe_name, user_id, category_id, instructions, picture_location)
VALUES ('Fried Egg', 1, 1, 'Heat pan, put butter in pan, let it melt, crack egg into pan, cook for 4min.', null)

INSERT INTO RecipeIngredients (recipe_id, ingredient_id, measurement)
VALUES (1, 1, '1'), (1, 2, '20g')
