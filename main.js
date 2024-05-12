// Product data with price and color options
const products = [
  { 
      name: "Apple Iphone X", 
      description: " iPhone X, released in 2017, introduced an edge-to-edge OLED display, Face ID, and a powerful A11 Bionic chip, revolutionizing smartphone design and functionality.", 
      imageUrl: "https://images.unsplash.com/photo-1537589376225-5405c60a5bd8?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      price:  17199, 
      colors: ["Red", "Blue", "Green"]
  },
  { 
      name: " Apple Iphone 11", 
      description: "iPhone 11 features a 6.1-inch display, dual-camera system, A13 Bionic chip, and all-day battery life, offering a great balance of performance and value", 
      imageUrl: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      price: 21500, 
      colors: ["Black", "White", "Gray"]
  },
  { 
    name: "Apple Iphone 12 pro", 
    description: "iPhone 12 Pro offers a sleek design, powerful A14 Bionic chip, advanced triple-camera system, 5G support, and MagSafe technology, setting a new standard in smartphone innovation", 
    imageUrl: "https://images.unsplash.com/photo-1611791485440-24e8239a0377?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    price: 42000, 
    colors: ["Silver", "Graphite", "Gold","Pacific Blue"]
  },
  { 
    name: "Samsung Galaxy S21", 
    description: "Samsung Galaxy S21 is a flagship smartphone with a stunning display, powerful processor, and versatile camera system.", 
    imageUrl: "https://images.unsplash.com/photo-1615264952739-555010f3b29b?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    price:  65000, 
    colors: ["Gray", "Phantom White", "Violet"]
  },
  { 
    name: "Google Pixel 5", 
    description: "Google Pixel 5 offers a clean Android experience, excellent camera capabilities, and 5G connectivity.", 
    imageUrl: "https://images.unsplash.com/photo-1602863414373-ef18f5f1ce3a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    price: 55000, 
    colors: ["Black", "Sage"]
  }
];

// Define a global variable to store the cart items
let cart = [];

// Function to generate HTML for a product
function generateProductHTML(product) {
  // Generate HTML for color options
  const colorDots = product.colors.map(color => `
    <span class="color-dot" style="background-color: ${color.toLowerCase()}" data-color="${color.toLowerCase()}"></span>
  `).join('');

  // Generate HTML for product images
  const imageSlide = `
    <div class="swiper-slide d-flex justify-content-center align-items-center">
      <img class="card-img-top" style="object-fit: cover; height: 300px;" src="${product.imageUrl}" alt="${product.name}">
    </div>
  `;

  return `
    <div class="col-md-3 mb-4">
      <div class="card h-100">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            ${imageSlide}
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-price">₹${product.price.toFixed(2)}</p>
          <div class="color-options" onclick="selectColor(event)">${colorDots}</div>
          <button class="btn btn-primary mt-auto" onclick="addToCart('${product.name}', ${product.price}, '${product.imageUrl}')">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
}

let selectedColor = null; // Global variable to store the selected color

// Function to handle color selection
function selectColor(event) {
  const colorDot = event.target.closest('.color-dot');
  if (colorDot) {
    // Remove 'selected' class from all color dots
    const colorDots = document.querySelectorAll('.color-dot');
    colorDots.forEach(dot => dot.classList.remove('selected'));

    // Add 'selected' class to the clicked color dot
    colorDot.classList.add('selected');

    // Get the selected color
    selectedColor = colorDot.dataset.color;
  }
}


// Function to initialize Swiper for product image sliders
function initProductSwipers() {
  const productSwipers = document.querySelectorAll('.swiper-container');
  productSwipers.forEach(swiperContainer => {
    new Swiper(swiperContainer, {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  });
}

// Call the function to initialize Swiper when the page loads
window.addEventListener('load', initProductSwipers);

// Function to populate the product list
function populateProductList() {
  const productListContainer = document.getElementById("productList");
  let productsPerRow = 5; // Display 5 products per row
  let colSize = 12 / productsPerRow;

  let productHTML = '';
  products.forEach((product, index) => {
    productHTML += generateProductHTML(product);

    if ((index + 1) % productsPerRow === 0 || index === products.length - 1) {
      productListContainer.innerHTML += `<div class="row">${productHTML}</div>`;
      productHTML = '';
    }
  });
}

// Call the function to populate the product list when the page loads
window.addEventListener('load', populateProductList);


// Function to add product to cart
// Function to add product to cart
function addToCart(productName, productPrice, imageUrl) {
  // Check if a color is selected
  if (!selectedColor) {
    // Display a message asking the user to select a color first
    alert('Please select a color first.');
    return; // Exit the function without adding the product to the cart
  }

  // Check if the product already exists in the cart
  const existingItem = cart.find(item => item.productName === productName && item.selectedColor === selectedColor);

  if (existingItem) {
    // If the product with the same color already exists, increase its quantity
    existingItem.quantity++;
  } else {
    // If the product with the same color doesn't exist, add it to the cart
    cart.push({ productName, productPrice, imageUrl, selectedColor, quantity: 1 });
  }

  // Store the updated cart in localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Log a message to indicate the product has been added to the cart
  console.log(`Added ${productName} (${selectedColor}) to cart. Price: ₹${productPrice.toFixed(2)}`);

  // Show an alert to notify the user
  alert('Product added to cart.');
}
