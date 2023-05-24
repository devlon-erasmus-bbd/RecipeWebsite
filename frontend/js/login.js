function login(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create the request body
    const requestBody = {
        email: email,
        password: password
    };
    fetch('http://174.129.61.170:8080/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
    })
    .then(response => {
        console.log(response);
        if (response.status==200) {
            const email = requestBody.email; // Assuming the server sends the username in the response
           
            // sessionStorage.setItem('jwt-token', requestBody.username);
            
            window.location.href = `index.html?email=${email}`;
        } else {
            response.json().then(data => {
                const errorElement = document.getElementById('error-message');
                errorElement.textContent = `Login Failed: ${data.message}!`;
            });
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        // Handle error scenario, display an error message, etc.
    });
}