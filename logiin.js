document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;

    // Validate input
    if (!phone || !password) {
        alert("Please fill all fields.");
        return;
    }
    document.getElementById("login-form").addEventListener("submit", (e) => {
        e.preventDefault();
      
        // Get customer details from the form
        const customerName = document.getElementById("name").value;
        const customerPhone = document.getElementById("phone").value;
        const customerPassword = document.getElementById("password").value;
      
        // Save customer details to localStorage
        localStorage.setItem("customerName", customerName);
        localStorage.setItem("customerPhone", customerPhone);
        localStorage.setItem("customerPassword", customerPassword);
      
        // Redirect to the Order Confirmation Page
        window.location.href = "odconfirm.html";
      });

    // Retrieve users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(user => user.phone === phone && user.password === password);

    if (user) {
        alert("Login Successful!");
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // Save logged-in user
        window.location.href = "order-summary.html"; // Redirect to order summary page
    } else {
        alert("Invalid phone number or password.");
    }
});