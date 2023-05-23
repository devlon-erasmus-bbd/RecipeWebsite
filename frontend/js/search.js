function search() {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const params = searchParams.get("search");
    console.log(params);
    fetch(`http://localhost:8080/recipes/search?search=${params}`)
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