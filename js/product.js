const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id'); 

fetch('http://localhost:3000/api/products')
.then((response) => response.json())
    .then(response => {
        console.log(id)
        })

.catch((erreur) => console.log("erreur : " + erreur));
