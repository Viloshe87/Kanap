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
            displayQuantity(quantity);
            displayProducts(products);
            listenForDeletion();
            listenForQtyChange();

        })
        .catch((erreur) => console.log("erreur :" + erreur));
}


// function listenForQtyChange() {
//     document.querySelectorAll('.itemQuantity').forEach(button => {

//         button.addEventListener('change', (e) => {
//             let target = e.target;
//             let id = target.getAttribute('data.id');
//             let color = target.getAttribute('data.color');
//             let qty = target.value;

//             if (qty < 1) {
//                 alert('Merci de mettre une quantité supérieur a 0, sinon supprimer le produit');
//                 productsInCart[index].qty = qty;
//             }
//             let productsInCart = JSON.parse(localStorage.getItem("products"));
//             let index = productsInCart.findIndex(product.id === id && product.color == color);
//             productsInCart[index].qty = qty;
//             localStorage.setItem('products', JSON.stringify(productsInCart))
//             loacation.reload();
//         })
//     })

    function listenForDeletion() {
        document.querySelectorAll('.deleteItem').forEach(button => {

            button.addEventListener('click', (e) => {
                let target = e.target;
                let id = target.getAttribute('data-id');
                let color = target.getAttribute('data-color');

                let productsInCart = JSON.parse(localStorage.getItem("products"));
                let index = productsInCart.findIndex(product => product.id === id && product.color == color);
                productsInCart.splice(index, 1);

                localStorage.setItem('products', JSON.stringify(productsInCart))
                location.reload();
            })
        })
    }

    function displayProducts(products) {
        let html = '';

        products.forEach(product => {
            html += render(product);
        })
        document.getElementById('cart__items').innerHTML = html
    }


    //Récupération des infos de la page produit
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

    function render(product) {
        return `<article class="cart__item" data-id="${product._id}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${product.name}- ${product.color}</h2>
        <p>${formatter.format(product.price)}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" data.id="${product._id}" data.color="${product.color} " name="itemQuantity" min="1" max="100" value="${product.qty}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${product._id}" data-color="${product.color}" >Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
    }

    function buildCompletProductsList(allProducts) {

        let products = [];
        let productsInInCart = JSON.parse(localStorage.getItem("products"));

        productsInInCart.forEach(cartItem => {
            let item = allProducts.find(item => item._id == cartItem.id)
            let product = { ...item }
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
    //Affichage du prix total du produit
    function displayTotal(total) {

        document.getElementById('totalPrice').innerHTML = formatter.format(total)
    }
    //Affichafe de la quantité du produit
    function displayQuantity(quantity) {

        document.getElementById('totalQuantity').innerHTML = quantity
    }