// Function to populate the cart items
function populateCartItems() {
    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart'));

    // Get the container where cart items will be displayed
    const cartItemList = document.getElementById('cartItemList');

    // Clear previous cart items
    cartItemList.innerHTML = '';

    // Initialize total price
    let totalPrice = 0;

    // Check if there are any cart items
    if (cartItems && cartItems.length > 0) {
        // Loop through cart items and display them
        cartItems.forEach(item => {
            // Create HTML elements for each cart item
            const cartItemElement = document.createElement('li');
            cartItemElement.classList.add('cart-item');

            // Create image element
            const imageElement = document.createElement('img');
            imageElement.src = item.imageUrl;
            imageElement.alt = item.productName;
            imageElement.style.width = '200px'; // Adjust image size as needed
            cartItemElement.appendChild(imageElement);

            // Create span for product name, color, and price
            const textSpan = document.createElement('span');
            textSpan.textContent = `${item.productName} (${item.selectedColor}) - ₹${item.productPrice.toFixed(2)} x `;
            cartItemElement.appendChild(textSpan);

            // Create remove button
            const removeButton = document.createElement('button');
            removeButton.classList.add('removeItem');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                // Remove item from cartItems array
                const index = cartItems.indexOf(item);
                if (index > -1) {
                    cartItems.splice(index, 1);
                    // Update cart in localStorage
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    // Repopulate cart items
                    populateCartItems();
                }
            });
            cartItemElement.appendChild(removeButton);

            // Create quantity control
            const quantityControl = document.createElement('div');
            quantityControl.classList.add('quantity-control');

            // Create decrease quantity button
            const decreaseButton = document.createElement('button');
            decreaseButton.classList.add('decreaseQuantity');
            decreaseButton.textContent = '-';
            decreaseButton.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    // Update cart in localStorage
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    // Repopulate cart items
                    populateCartItems();
                }
            });
            quantityControl.appendChild(decreaseButton);

            // Create quantity display
            const quantityDisplay = document.createElement('span');
            quantityDisplay.classList.add('quantity');
            quantityDisplay.textContent = item.quantity;
            quantityControl.appendChild(quantityDisplay);

            // Create increase quantity button
            const increaseButton = document.createElement('button');
            increaseButton.classList.add('increaseQuantity');
            increaseButton.textContent = '+';
            increaseButton.addEventListener('click', () => {
                item.quantity++;
                // Update cart in localStorage
                localStorage.setItem('cart', JSON.stringify(cartItems));
                // Repopulate cart items
                populateCartItems();
            });
            quantityControl.appendChild(increaseButton);

            cartItemElement.appendChild(quantityControl);

            // Add item price to total price
            const itemPrice = item.productPrice * item.quantity;
            totalPrice += itemPrice;

            // Append the cart item element to the cart item list
            cartItemList.appendChild(cartItemElement);
        });
    } else {
        // If cart is empty, display a message
        cartItemList.textContent = 'Your cart is empty';
    }

    // Update total price
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `Total: ₹${totalPrice.toFixed(2)}`;
}

// Call the function to populate cart items when the page loads
window.addEventListener('load', populateCartItems);
