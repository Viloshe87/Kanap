//Instauration formulaire avec regex

// Ajout des Regex
let form = document.querySelector(".cart__order__form");

//Création des expressions régulières
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

// Ecoute de la modification du prénom
form.firstName.addEventListener('input', function () {
    validFirstName(this);
});

// Ecoute de la modification du nom
form.lastName.addEventListener('input', function () {
    validLastName(this);
});

// Ecoute de la modification de l'adresse
form.address.addEventListener('input', function () {
    validAddress(this);
});

// Ecoute de la modification de la ville
form.city.addEventListener('input', function () {
    validCity(this);
});

// Ecoute de la modification de l'email
form.email.addEventListener('input', function () {
    validEmail(this);
});

//validation du prénom
function validFirstName(inputFirstName) {
    let el = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
        hideError(el);
        return true;
    } else {
        showError(el, 'Veuillez renseigner ce champ');
        return false
    }
};

//validation du nom
function validLastName(inputLastName) {
    let el = inputLastName.nextElementSibling;


    if (charRegExp.test(inputLastName.value)) {
        hideError(el);
        return true;
    }
    showError(el, 'Veuillez renseigner ce champ');
    return false
};

//validation de l'adresse
function validAddress(inputAddress) {
    let el = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
        hideError(el);
        return true;
    }
    showError(el, 'Veuillez renseigner ce champ');
    return false;
};

//validation de la ville
function validCity(inputCity) {
    let el = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
        hideError(el);
        return true;
    }
    showError(el, 'Veuillez renseigner ce champ');
};

//validation de l'email
function validEmail(inputEmail) {
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

//Masque l'erreur du formulaire pour afficher texte utilisateur //
function hideError(element) {
    element.innerHTML = '';
}


//Envoi des informations client au localstorage
function postForm() {
    const btn_commander = document.getElementById("order");

    //Ecouter le panier
    btn_commander.addEventListener("click", (event) => {
        event.preventDefault();

        let inputFirstName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAddress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputEmail = document.getElementById('email');

        if (!validFirstName(inputFirstName)
            || !validLastName(inputLastName)
            || !validAddress(inputAddress)
            || !validCity(inputCity)
            || !validEmail(inputEmail)) {
            alert('Merci de bien remplir le formulaire')
            return;
        }

        //Construction d'un array depuis le local storage
        let productsIds = JSON.parse(localStorage.getItem("products")).map(product => product.id);

        const payload = {
            contact: {
                firstName: inputFirstName.value,
                lastName: inputLastName.value,
                address: inputAddress.value,
                city: inputCity.value,
                email: inputEmail.value,
            },
            products: productsIds,
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
                localStorage.clear();
                document.location.href = "confirmation.html?order=" + data.orderId;
            })
            .catch((err) => {
                alert("Problème avec fetch : " + err.message);
            });
    })
}
postForm();