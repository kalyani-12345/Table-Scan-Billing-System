// Function to update quantity
function updateQuantity(button, change) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    quantity += change;

    // Ensure quantity doesn't go below 1
    if (quantity < 1) quantity = 1;

    quantityElement.textContent = quantity;
}

// Function to add item to cart
function addToCart(itemName, price, button) {
    const quantity = parseInt(button.parentElement.querySelector('.quantity').textContent);
    const totalPrice = price * quantity;

    // Create cart item object
    const cartItem = {
        name: itemName,
        price: price,
        quantity: quantity,
        total: totalPrice
    };

    // Add to cart (you can use localStorage or an array to store cart items)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${quantity} x ${itemName} added to cart for ₹${totalPrice}`);
}