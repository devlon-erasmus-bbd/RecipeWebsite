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
            item.setAttribute('id', 'recipe')
            item.textContent = `${recipe.recipe_name} by ${recipe.username}:`;

            if (recipe.picture_location !== null) {
                const img = document.createElement('img');
                img.setAttribute('src', recipe.picture_location);
                item.appendChild(img);
            }

            recipe.instructions.split("\n").forEach(instr => {
                const instruction = document.createElement('section');
                instruction.setAttribute('id', 'instruction');
                instruction.textContent = instr;
                item.appendChild(instruction);
            });

            list.appendChild(item);
        });
        }
        document.getElementById('recipes').appendChild(list);
    })
    .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', recipeList);