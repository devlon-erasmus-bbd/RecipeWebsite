function addIngredient() {
    const ingredientList = document.getElementById('ingredientList');
    const ingredientCount = 0;

    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input type="text" name="ingredientName[]" id="ingredientName[]" placeholder="Ingredient name">
      <input type="text" name="ingredientMeasurement[]" id="ingredientMeasurement[]" placeholder="Ingredient measurement">
      <button type="button" onclick="removeIngredient(this)">Remove</button>
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
