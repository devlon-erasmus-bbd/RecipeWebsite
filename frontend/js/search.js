function search() {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const params = searchParams.get("search");
    console.log(params);
    fetch(`https://174.129.61.170:8080/recipes/search?search=${params}`)
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

            const ingred = document.createElement('section');
            ingred.setAttribute('id', 'ingred');
            ingred.textContent = `Ingredients: `
            fetch(`https://174.129.61.170:8080/recipes/ingredients?recipeName=${recipe.recipe_name}`)
            .then(response => response.json())
            .then(data => {
                data.forEach(ingredient => {
                    const ingreds = document.createElement('section');
                    ingreds.setAttribute('id', 'ingreds');
                    ingred.style.fontSize = '65%';
                    ingreds.textContent = `• ${ingredient.ingredient}: ${ingredient.measurement}`;
                    ingred.appendChild(ingreds);
                });
            });
            item.appendChild(ingred);

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

document.addEventListener('DOMContentLoaded', search);