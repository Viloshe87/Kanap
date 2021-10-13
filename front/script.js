//fetch de l'URL
fetch('http://localhost:3000/api/products')
    .then((response) => response.json())
    .then((data) => {
        addCards(data);
    })
    .catch((erreur) => console.log("erreur : " + erreur));

// fonction pour la création des cards de la page d'accueil
function addCards(data) {
    //boucle pour chaque iteration d'un produit
    for (produit of data) {
        //recupère l'élément liste dans le HTML
        const card = document.getElementById("items");
      
        card.innerHTML += `
        <a href="./product.html?id=42">
        <article>
          <img src="" alt="Lorem ipsum dolor sit amet, Kanap name1">
          <h3 class="productName">Kanap name1</h3>
          <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada
            risus sapien gravida nulla nisl arcu.</p>
     
          </article>
      </a> `;
    }
}




  



//Afficher les canapés sur la page web

