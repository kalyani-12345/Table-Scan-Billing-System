// Load cart items from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// Display cart items
function displayCartItems() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>₹${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-selector">
                <button onclick="updateCartItemQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateCartItemQuantity(${index}, 1)">+</button>
            </div>
            <button onclick="removeCartItem(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    cartTotalElement.textContent = total.toFixed(2);
}

// Update item quantity in the cart
function updateCartItemQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

// Remove item from the cart
function removeCartItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = 'signup.html'; // Redirect to signup page
}

// Display cart items on page load
displayCartItems();