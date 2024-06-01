// Cart items array
let cartItems = [];

// Function to add item to cart
function addToCart(item) {
    cartItems.push(item);
    updateCartCount();
}

// Function to update cart count in navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartItems.length;
    }
}

// Event listener for cart link in navbar
document.getElementById('cart-link').addEventListener('click', function (e) {
    e.preventDefault();
    showCartModal();
});

// Function to show cart modal
function showCartModal() {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'), {
        keyboard: false
    });
    const cartItemsContainer = document.getElementById('cartItems');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = ''; // Clear previous items

        if (cartItems.length > 0) {
            cartItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.textContent = item.name; // Replace 'name' with actual item property
                cartItemsContainer.appendChild(itemElement);
            });
        } else {
            const emptyCartMessage = document.createElement('div');
            emptyCartMessage.textContent = 'Your cart is empty.';
            cartItemsContainer.appendChild(emptyCartMessage);
        }

        cartModal.show();
    }
}

// Function to close the cart modal
function closeCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        const modal = bootstrap.Modal.getInstance(cartModal);
        if (modal) {
            modal.hide();
        }
    }
}

// Event listener for close button in cart modal
document.getElementById('cartModal').addEventListener('hidden.bs.modal', function () {
    // Clear the cart items container when modal is closed
    const cartItemsContainer = document.getElementById('cartItems');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
    }
});

// Event listener for checkout button in cart modal
document.getElementById('checkoutBtn').addEventListener('click', function () {
    // Perform checkout logic here
    closeCartModal();
});

document.getElementById('closeBtn1').addEventListener('click', function () {
    closeCartModal();
});

document.getElementById('closeBtn2').addEventListener('click', function () {
    closeCartModal();
});