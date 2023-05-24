
function addRecipe(event) {
    event.preventDefault();
    const recipeName = document.getElementById('recipe-name').value;
    const category = document.getElementById('category').value;
    const ingredients = getIngredients();
    const instructions = document.getElementById('instructions').value;
    const username = sessionStorage.getItem('usernameDisplay');

    if (username === null) {
      alert('Please login before posting a recipe');
      return;
    }

    // Create the request body
    const requestBody = [{
        recipeName: recipeName,
        category: category,
        instructions: instructions,
        username: username, 
        ingredients: ingredients
    }];

    fetch('http://localhost:8080/recipes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)

    })
    .then(response => {
        if (response.status==201) {
            alert('Recipe Posted!');
            console.log("Success recipe upload");
        } else {
          alert('Posting New Recipe Failed');
        }
    })
    .catch(error => {
        console.error('Error during post recipe:', error);
        // Handle error scenario, display an error message, etc.
    });
}

let ingredientCount = 0;
function addIngredient() {
    const ingredientList = document.getElementById('ingredientList');

    const listItem = document.createElement('li');
    const ingredientId = `ingredient-${ingredientCount}`;

    listItem.innerHTML = `
      <input type="text" id="${ingredientId}-name" name="${ingredientId}-name" placeholder="Ingredient name">
      <input type="text" id="${ingredientId}-measurement" name="${ingredientId}-measurement" placeholder="Ingredient measurement">
      <button type="button" onclick="removeIngredient('${ingredientId}')">Remove</button>
    `;

    ingredientList.appendChild(listItem);
    ingredientCount++;
  }

  function removeIngredient(button) {
    const listItem = button.parentNode;
    const ingredientList = listItem.parentNode;

    ingredientList.removeChild(listItem);
  }

  function getIngredients() {
    const ingredients = [];

    for (let i = 0; i < ingredientCount; i++) {
      const ingredientId = `ingredient-${i}`;
      const ingredientName = document.getElementById(`${ingredientId}-name`).value;
      const ingredientMeasurement = document.getElementById(`${ingredientId}-measurement`).value;

      ingredients.push({
        name: ingredientName,
        measurement: ingredientMeasurement
      });
    }
    return ingredients;
  }