console.log('123');
if (isCartempty()) {
    showemptyCart();
} else {

    fetch("http://localhost:3000/api/products/")
        .then((response) => response.json())
        .then((allProducts) => {
            let products = buildCompletProductsList(allProducts);
        })
        .catch((erreur) => console.log("erreur :" + erreur));
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