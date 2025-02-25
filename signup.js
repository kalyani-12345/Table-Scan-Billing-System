document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;

    // Validate input
    if (!name || !phone || !password) {
        alert("Please fill all fields.");
        return;
    }

    // Store user data in localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userExists = users.some(user => user.phone === phone);
    if (userExists) {
        alert("User already exists. Please login.");
        window.location.href = "logiin.html";
        return;
    }

    // Save new user
    users.push({ name, phone, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup Successful!");
    window.location.href = "logiin.html"; // Redirect to login page
});