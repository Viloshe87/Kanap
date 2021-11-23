console.log('123');
if (isCartempty()) {
    showemptyCart();
} else {

    fetch("http://localhost:3000/api/products/")
        .then((response) => response.json())
        .then((allProducts) => {
            let products = buildCompletProductsList(allProducts);

            let total = countTotal(products);
            let quantity = countQuantity(products);
            displayTotal(total)
            displayQuantity(quantity)
        })
        .catch((erreur) => console.log("erreur :" + erreur));
}

function countTotal(products) {

    let total = 0;
    products.forEach(product => {
        total = total + (Number(product.price) * Number(product.qty))
    })
    return total;
}

function countQuantity(products) {
    let quantity = 0;

    products.forEach(product => {
        quantity = quantity + Number(product.qty);
    })
    return quantity;
}

function buildCompletProductsList(allProducts) {

    let products = [];
    let productsInInCart = JSON.parse(localStorage.getItem("products"));

    productsInInCart.forEach(cartItem => {
        let product = allProducts.find(item => item._id == cartItem.id)
        product.qty = cartItem.qty
        product.color = cartItem.color
        console.log(product)
        products.push(product);
    })
    return products;
}

function isCartempty() {
    if (!localStorage.getItem('products')) {
        return true;
    }
    if (JSON.parse(localStorage.getItem('products')).length == 0) {
        return true;
    };
    return false;
}

function showemptyCart() {
    document.querySelector('h1').innerText = 'Panier vide'
    document.querySelector('.cart').getElementsByClassName.display = 'none'
}

function displayTotal(total) {

    document.getElementById('totalPrice').innerHTML = total
}

function displayQuantity(quantity) {

    document.getElementById('totalQuantity').innerHTML = quantity
}