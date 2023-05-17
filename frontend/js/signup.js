function signup() {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const requestBody = {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    };
  
    fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (response.ok) {
                window.location.href = 'loginPage.html';
            } else {
            response.json().then(data => {
                const errorElement = document.getElementById('error-message');
                errorElement.textContent = `Signup Failed: ${data.message}!`;
                })
            }
        })
        .catch(error => {
            console.error('Error during signup:', error);
        });
}