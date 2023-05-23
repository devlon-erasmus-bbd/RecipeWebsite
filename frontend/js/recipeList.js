function recipeList() {
    const url = new URL(window.location.href);
    const params = url.search;
    fetch(`http://localhost:8080/recipes/category${params}`)
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
            item.textContent = `${recipe.recipe_name} by ${recipe.username}:`;

            recipe.instructions.split("\n").forEach(instruction => {
                const instructions = document.createElement('section');
                instructions.textContent = instruction;
                item.appendChild(instructions);
            });

            list.appendChild(item);
        });
        }
        document.getElementById('recipes').appendChild(list);
    })
    .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', recipeList);