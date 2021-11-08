//récupérer les paramètres d’URL//

var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");
console.log(id);





// Récupération des articles de l'API//
fetch("http://localhost:3000/api/products/" + id)
    .then((res) => {
        return res.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(function (resultatAPI) {
        article = resultatAPI;
        console.log(article);
        if (article) {
            display(article);
            listenForCartAdd();
        }
    })
    .catch((error) => {
        console.log("Erreur de la requête API");
    })

//Affichages des produits 

function display(article) {
    // Insertion de l'image
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Modification du titre "h1"
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // Modification du prix
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Modification de la description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Insertion des options de couleurs
    for (let colors of article.colors) {
        console.log(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
}

//Ajout du produit dans le local storage
function listenForCartAdd() {
    document.getElementById('addToCart').addEventListener('click', () => {
        let qty = document.getElementById('quantity').value;
        let color = document.getElementById("colors").value;

        if (qty < 1) {
            alert("la quantité doit etre supérieur a 1.");
            return;
        }

        if (color.length == 0) {
            alert("Vous devez selectionner une couleur");
            return;
        }

        let product = { id, qty, color };
        let products = [];

        if (localStorage.getItem('products')) {
            products = JSON.parse(localStorage.getItem("products"));
            let productAlreadyExist = products.find(product => product.id == id && product.color == color);

            if (productAlreadyExist) {
                productAlreadyExist.qty = Number(productAlreadyExist.qty) + Number(qty);
            } else {
                products.push(product)
            }
        }
        else {
            products.push(product)
        }



    })
}