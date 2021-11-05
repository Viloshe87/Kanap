//fetch de l'URL
fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => {
    display(data);
  })
  .catch((erreur) => console.log("erreur : " + erreur));


function display(produits) {
  const card = document.getElementById("items")

  for (produit of produits) {
    card.innerHTML += render(produit);
  }
}


function render(produit) {
  return `
<a href="product.html?id=${produit._id}">
        <article>
          <img src="${produit.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
          <h3 class="productName">${produit.name}</h3>
          <p class="productDescription">${produit.description}</p>
     
          </article>
      </a> `;
}











