//Instauration formulaire avec regex

// Ajout des Regex
let form = document.querySelector(".cart__order__form");

//Création des expressions régulières
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

// Ecoute de la modification du prénom
form.firstName.addEventListener('change', function () {
    validFirstName(this);
});

// Ecoute de la modification du prénom
form.lastName.addEventListener('change', function () {
    validLastName(this);
});

// Ecoute de la modification du prénom
form.address.addEventListener('change', function () {
    validAddress(this);
});

// Ecoute de la modification du prénom
form.city.addEventListener('change', function () {
    validCity(this);
});

// Ecoute de la modification du prénom
form.email.addEventListener('change', function () {
    validEmail(this);
});

//validation du prénom
const validFirstName = function (inputFirstName) {
    let el = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
        hideError(el);
    } else {
        el.innerHTML = 'Veuillez renseigner ce champ.';
    }
};

//validation du nom
const validLastName = function (inputLastName) {
    let el = inputLastName.nextElementSibling;


    if (charRegExp.test(inputLastName.value)) {
        hideError(el);
        return true;
    }
    showError(el, 'Veuillez renseigner ce champ');
    return false
};

//validation de l'adresse
const validAddress = function (inputAddress) {
    let el = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
        hideError(el);
        return true;
    }
    showError(el, 'Veuillez renseigner ce champ');
    return false;
};

//validation de la ville
const validCity = function (inputCity) {
    let el = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
        hideError(el);
        return true;
    }
    showError(el, 'Veuillez renseigner ce champ');
};

//validation de l'email
const validEmail = function (inputEmail) {
    let el = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
        hideError(el);
        return true;
    }
    showError(el, 'Veuillez renseigner ce champ');
    return false;
};

function showError(element, message) {
    element.innerHTML = message;
}

function hideError(element) {
    element.innerHTML = '';
}


//Envoi des informations client au localstorage
function postForm(){
    const btn_commander = document.getElementById("order");

    //Ecouter le panier
    btn_commander.addEventListener("click", (event)=>{
    
        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let i = 0; i<produitLocalStorage.length;i++) {
            idProducts.push(produitLocalStorage[i].idProduit);
        }
        console.log(idProducts);

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        } 

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);

            document.location.href = "confirmation.html";
        })
        .catch((err) => {
            alert ("Problème avec fetch : " + err.message);
        });
        })
}
postForm();