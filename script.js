// all products that are added manualy to JSON

const products =
[
    {
        id: 0,
        name: "Coffee mug",
        price: "5.00",
        description: "It's coffee time!",
        quantity: "20",
    },
    {
        id: 1,
        name: "pen",
        price: "5.00",
        description: "pen for writing",
        quantity: "100",
    },
    {
        id: 2,
        name: "printer",
        price: "8000.00",
        description: "printer to print paper",
        quantity: "50",
    },
    {
        id: 3,
        name: "whiteboard",
        price: "50",
        description: "whiteboard for writing",
        quantity: "200",
    },
    {
        id: 4,
        name: "laptop",
        price: "779",
        description: "This laptop has a i7 processor and 8GB of RAM, it is a great laptop for gaming and programming",
        quantity: "12",
    },
    {
        id: 5,
        name: "agenda",
        price: "15",
        description: "Never miss a deadline again with this handy agenda.",
        quantity: "444",
    },
    {
        id: 6,
        name: "Coloured markers",
        price: "78",
        description: "A whole set of markers",
        quantity: "221",
    },
    {
        id: 7,
        name: "Office chair",
        price: "247",
        description: "Ergonomic office chair",
        quantity: "33",
    },
    {
        id: 8,
        name: "Office desk",
        price: "426",
        description: "For a productive day",
        quantity: "33",
    },
    {
        id: 9,
        name: "paperclip",
        price: "0.10",
        description: "Keep it together with this paperclip",
        quantity: "20000",
    },
    {
        id: 10,
        name: "Ping pong-table",
        price: "2000",
        description: "For the well deservered break",
        quantity: "22",
    },
    {
        id: 11,
        name: "Water machine",
        price: "500",
        description: "Provide water for the office",
        quantity: "44",
    },
    {
        id: 12,
        name: "Premium a4 paper",
        price: "34",
        description: "Provide water for the office",
        quantity: "9999",
    },
];

localStorage.setItem('product', JSON.stringify(products));
const productsLocalStorage = JSON.parse(localStorage.getItem('product'));
// load homepage
if (window.location.href.indexOf("index.html") > -1) {
    welcomePage();
    cartAmountFunc();
    favoriteAmountFunc();
    // when on  cart.html, load the cart
} else if (window.location.href.indexOf("cart.html") > -1) {
    updateCart();
    cartAmountFunc();
    favoriteAmountFunc();
    // when on favorites.html, load the favorites
} else if (window.location.href.indexOf("favorites.html") > -1) {
    updateFavorites();
    cartAmountFunc();
    favoriteAmountFunc();
    // load products when on products.html
} else if (window.location.href.indexOf("products.html") > -1) {
    // show amount of products in cart in header
    cartAmountFunc();
    // show amount of favorites in header
    favoriteAmountFunc();
    // for every product in the JSON file, create a product
    products.forEach((product) => {
        // for every product, call the function createProduct
        createProduct(product.id);
        // add event listener to every products buy and add to favorite buttons
        const buyButton = document.querySelector("button.btn[name='" + product.id + "']");
        buyButton.addEventListener('click', () => { addToCart(product.name); cartAmountFunc(); });
        const favorite = document.querySelector("button.favorite-btn[name='" + product.id + "']");
        favorite.addEventListener('click', () => { favoriteFunc(product.name); });
    });
} else if (window.location.href.indexOf("product.html") > -1) {
    showProduct();
    cartAmountFunc();
    favoriteAmountFunc();
}
// main function to create a product by combining all the other product functions.
function createProduct(product) {
    const container = document.getElementById('container');
    const productElement = document.createElement('div');
    const infoProduct = document.createElement('div');
    productElement.classList.add("product");
    infoProduct.classList.add('info-' + product);
    container.appendChild(productElement);
    productElement.appendChild(infoProduct);
    informationProduct(product);
    imageCreate(product);
    buyButn(product);
}
// function showing amount of products in cart
function cartAmountFunc() {
    let cartLength = 0;
    if (localStorage.getItem('cart') === null) {
        document.querySelector('.cart-amount').innerHTML = 0;
    } else {
        for (let i = 0; i < JSON.parse(localStorage.getItem('cart')).length; i++) {
            cartLength++;
        }
        const cartAmount = document.querySelector('.cart-amount');
        cartAmount.textContent = cartLength;
    }
}
// function showing amount of favorites
function favoriteAmountFunc() {
    let favLength = 0;
    if (localStorage.getItem('localFavorites') === null) {
        document.querySelector('.favorite-amount').innerHTML = "0";
    } else {
        for (let i = 0; i < JSON.parse(localStorage.getItem('localFavorites')).length; i++) {
            favLength++;
        }
        const favoriteAmount = document.querySelector('.favorite-amount');
        favoriteAmount.textContent = favLength;
    }
}
// function to create the image for every product and adding a favorite button above it.
function imageCreate(product) {
    const infoProduct = document.querySelector("div.info-" + product);
    const imageDiv = document.createElement('div');
    const favoriteDiv = document.createElement('div');
    const favoriteBtn = document.createElement('button');
    imageDiv.classList.add("imageDiv");
    const image = document.createElement('img');
    image.src = 'pictures/' + products[product].name + '.jpg';
    image.setAttribute("height", "200");
    image.setAttribute("width", "200");
    favoriteDiv.classList.add('favorite-' + product);
    favoriteBtn.classList.add('favorite-btn');
    favoriteBtn.innerHTML = "Favorite";
    favoriteBtn.name = product;
    favoriteDiv.appendChild(favoriteBtn);
    imageDiv.appendChild(favoriteDiv);
    infoProduct.appendChild(imageDiv);
    imageDiv.appendChild(image);
}
// product information including name, price and description.
function informationProduct(product) {
    const infoProduct = document.querySelector("div.info-" + product);
    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
    const name = document.createElement('a');
    name.innerHTML = products[product].name;
    name.onclick = function () { showProductPage(product); };
    const price = document.createElement('h3');
    price.textContent = "$ " + products[product].price;
    const description = document.createElement('p');
    description.textContent = products[product].description;
    infoProduct.appendChild(textDiv);
    textDiv.appendChild(name);
    textDiv.appendChild(price);
    textDiv.appendChild(description);
}

function showProductPage(product) {
    window.location.href = "product.html";
    productsLocalStorage.forEach(pro => {
        if (pro.id === product) {
            localStorage.setItem('productShow', JSON.stringify(pro));
            showProduct();
        }
    });
}

function showProduct() {
    const welcome = document.querySelector('#welcome');
    const productShow = JSON.parse(localStorage.getItem('productShow'));
    if (productShow == null) {
        welcome.innerHTML = "No product found";
    }
    welcome.innerHTML += `
    <div class="productDetailPage">
        <div class="imageDiv">
            <img src="pictures/${productShow.name}.jpg" height="200" width="200">
        </div>
        <div class="detailsText">
            <h1>${productShow.name}</h1>
            <h3>$ ${productShow.price}</h3>
            <p class="details">${productShow.description}</p>
        </div>
    </div>
    `;
}

// function to create the buy button for every product.
function buyButn(product) {
    const infoProduct = document.querySelector("div.info-" + product);
    const buyDiv = document.createElement('div');
    const soldDiv = document.createElement('div');
    const buyBtn = document.createElement('button');
    buyDiv.classList.add('buy');
    soldDiv.classList.add('sold' + product);
    buyBtn.innerHTML = "buy";
    buyBtn.classList.add('btn');
    buyBtn.name = product;
    buyDiv.appendChild(soldDiv);
    soldDiv.appendChild(buyBtn);
    infoProduct.appendChild(buyDiv);
}
// function that decides how to add a product to the cart when the buy button is clicked.
function addToCart(name) {
    if (localStorage.getItem("cart") === null) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
    const cart = JSON.parse(localStorage.getItem("cart"));
    const product = products.find(productEl => productEl.name === name);
    const itemList = cart.find(item => item.name === product.name);

    // check if item is already in cart, if so, increase quantity, otherwise add this as a new item to cart.

    if (itemList) {
        if (itemList.numberOfUnits < product.quantity) {
            cart.find(itemProduct => itemProduct.name === name).numberOfUnits++;
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        } else if (itemList.numberOfUnits >= product.quantity) {
            const soldBtn = document.querySelector(`[name="${product.id}"]`);
            const soldOut = document.querySelector(`.sold${product.id}`);
            soldOut.innerHTML = "Sold out";
            soldBtn.disabled = true;
        }
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            quantity: product.quantity,
            numberOfUnits: 1,
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
        exit(0);
    }
}
// adding favorites to localstorage favorites array.

let localFavorites = localStorage.favoriteItems || [];

function favoriteFunc(id) {
    let favoriteItems = JSON.parse(localStorage.getItem('localFavorites')) || [];
    if (favoriteItems.some(e => e.name === id)) {
        alert("Product already in favorites");
    } else {
        const product = products.find(productItem => productItem.name === id);
        favoriteItems.push({
            ...product,
            favorite: "yes",
        });
        location.reload();
        localStorage.localFavorites = JSON.stringify(favoriteItems);
        localFavorites = JSON.parse(localStorage.favoriteItems);
        localStorage.setItem('localFavorites', JSON.stringify(localFavorites));
    }
}

// when in shoppingcart page, choose if you want to add or reduce to amount of units you want to buy.
function changeNumberOfUnits(action, id) {
    let cart = JSON.parse(localStorage.getItem('cart'));

    // find the product in cart and change the number of units.

    const product = products.find(productEl => productEl.name === id);
    const itemList = cart.find(item => item.id === product.id);

    cart = cart.map((productItem) => {
        let numberOfUnits = productItem.numberOfUnits;
        if (productItem.name === id) {
            if (action === 'plus' && numberOfUnits < itemList.quantity) {
                numberOfUnits++;
            } else if (action === 'minus' && numberOfUnits > 1) {
                numberOfUnits--;
            } else if (action === 'minus' && (numberOfUnits === 1)) {
                // if units are 0, remove the product from the cart.
                removeItemFromCart(id);
                updateCart();
                exit(0);
            } else {
                alert("You bought the last of this product");
            }
        }
        // return the product with the new number of units.
        return {
            ...productItem,
            numberOfUnits,
        };
    });
    // update the cart in localstorage.
    localStorage.setItem('cart', JSON.stringify(cart));
    // update the cart on the page.
    updateCart();
}
// function that loades all products when on the cart.html page.
function updateCart() {
    const contain = document.querySelector("#shopping-cart");
    contain.innerHTML = "";
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
        const emptyCart = document.createElement('div');
        emptyCart.classList.add('empty-cart');
        emptyCart.textContent = "Your cart is empty";
        contain.appendChild(emptyCart);
    } else {
        const priceArray = [];
        cart.forEach((product) => {
            contain.innerHTML +=
            `<div class="item">
                <div class="buttons">
                <div class="item-info" onclick="removeItemFromCart('${product.name}')">
                    <image src="pictures/trash-icon.jpg" width="50" />
                </div>
                    <span class="like-btn"></span>
                </div>
                <div class="image">
                    <img src="pictures/${product.name}.jpg" height="300" width="300" alt="${product.name}image" />
                </div>
                <div class="description">
                    <span>${product.name}</span>
                    <span>${product.description}</span>
                </div>
                <div class="quantity">
                    <div class="btn-minus" onclick="changeNumberOfUnits('minus', '${product.name}')">-</div>
                    <div class="number">${product.numberOfUnits}</div>
                    <div class="btn-plus" onclick="changeNumberOfUnits('plus', '${product.name}')">+</div>
                </div>
            </div>`;
            let price = product.numberOfUnits * product.price;
            priceArray.push(price);
        });
        const totalPrice = priceArray.reduce((a, b) => a + b, 0);
        contain.innerHTML +=
        `<div class="total-price">
            <div class="total-price-text"><p>Total price </p></div>
            <div class="total-price-value"><p> $ ${totalPrice} </p></div>
        </div>`;
    }
}
// load all products that were selected as favorites
function updateFavorites() {
    const contain = document.getElementById("favorites");
    contain.innerHTML = "";
    let favorites = JSON.parse(localStorage.getItem('localFavorites'));
    if (!favorites) {
        const emptyFavorites = document.createElement('div');
        emptyFavorites.classList.add('empty-favorites');
        emptyFavorites.textContent = "Your favorites is empty";
        contain.appendChild(emptyFavorites);
    } else {
        favorites.forEach((product) => {
            contain.innerHTML +=
            `<div class="item">
                <div class="buttons">
                    <div class="item-info" onclick="removeItemFromFavorites('${product.name}')">
                        <image src="pictures/trash-icon.jpg" width="50" />
                    </div>
                </div>
                <div class="image">
                    <img src="pictures/${product.name}.jpg" height="300" width="300" alt="${product.name}image" />
                </div>
                <div class="description">
                    <span>${product.name}</span>
                    <span>${product.description}</span>
                </div>
            </div>`;
        });
    }
}
// remove item from favorite with the remove button in favorites.html
function removeItemFromFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem('localFavorites'));
    favorites = favorites.filter((item) => item.name !== id);
    localStorage.setItem('localFavorites', JSON.stringify(favorites));
    if (favorites.length === 0) {
        localStorage.removeItem('localFavorites');
    }
    updateFavorites();
    location.reload();
}
// remove item from cart with button in cart.html
function removeItemFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter((item) => item.name !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    if (cart.length === 0) {
        localStorage.removeItem('cart');
    }
    updateCart();
    location.reload();
}

function welcomePage() {
    const welcome = document.getElementById("welcome");
    const welcomeText = document.createElement('div');
    const welcomeImageDiv = document.createElement('div');
    const welcomeImage = document.createElement('img');
    const welcomeTextDiv = document.createElement('div');
    welcomeText.classList.add('welcome-text');
    welcomeImageDiv.classList.add('welcome-image');
    welcomeTextDiv.classList.add('welcome-text-div');
    welcomeImage.src = "pictures/dunder-mifflin-building.png";
    welcomeImage.alt = "Dunder Mifflin building";
    welcomeImage.width = "600";
    welcomeImageDiv.appendChild(welcomeImage);
    welcomeText.textContent = "Welcome to the Dunder Mifflin Paper Company";
    welcomeTextDiv.innerHTML =
    "<ul><li>Go to the shop to add products to your cart or favorites list.</li>"
    + "<li>Check your cart and favorites list to see what you have selected.</li>"
    + "<li>Removing items from your cart and favorites list is done by clicking the trashcan.</li>"
    + "<li>To change the number of units of a product in your cart, click the plus or minus buttons.</li>"
    + "<li>Thanks for visiting our website, and have fun with your purchase!</li></ul>";
    welcome.appendChild(welcomeImageDiv);
    welcome.appendChild(welcomeText);
    welcome.appendChild(welcomeTextDiv);
}