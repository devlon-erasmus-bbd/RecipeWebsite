function catergoryList() {
    fetch('https://174.129.61.170:8080/categories/list')
    .then(response => response.json())
    .then(data => {
    const list = document.createElement('p');
    data.forEach(category => {
        const link = document.createElement('a');
        // link.href = `/recipes/category?category=${category.category}`;
        link.href = `displayRecipes.html?category=${category.category}`;
        const item = document.createElement('section');
        item.textContent = category.category.toUpperCase();
        link.appendChild(item);
        list.appendChild(link);
    });
        document.getElementById('categories').appendChild(list);
    })
    .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', catergoryList);