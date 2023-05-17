function displayUsername() {
    const usernameElement = document.getElementById('usernameDisplay');
    let username = sessionStorage.getItem('usernameDisplay'); // Retrieve username from sessionStorage

    if (username) {
        usernameElement.textContent = username;
    } else {
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);
        const params = searchParams.get("email");
        if (params != null) {
            fetch(`http://localhost:8080/user-details/${params}`)
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    usernameElement.innerHTML  = '<a href="/login/page">Please Login!</a>';
                } else {
                    usernameElement.textContent = data.username;
                    sessionStorage.setItem('usernameDisplay', data.username); // Store username in sessionStorage
                }
            })
            .catch(err => console.error(err));
        }
        else {
            usernameElement.innerHTML  = '<a href="/login/page">Please Login!</a>';
        }
        
    }
}

document.addEventListener('DOMContentLoaded', displayUsername);