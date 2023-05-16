function recipeList() {
    const url = new URL(window.location.href);
    const params = url.search;
    fetch(`/recipes/category${params}`)
    .then(response => response.json())
    .then(data => {
    const list = document.createElement('p');
            if (data.length == 0) {
            const item = document.createElement('section');
            item.textContent = `No recipes available!`;
            list.appendChild(item);
        } else {
            data.forEach(recipe => {
            const item = document.createElement('section');
            item.textContent = `${recipe.recipe_name}: ${recipe.instructions}`;
            list.appendChild(item);
        });
        }
        document.getElementById('recipes').appendChild(list);
    })
    .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', recipeList);