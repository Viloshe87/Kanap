
//  Récupération des données pour les produits (canapés) avec l'API fetch.
fetch('http://localhost:3000/api/products')
  //Demande de récupération de requête format json
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (products) {
    console.log(products);
    


  })








//Afficher les canapés sur la page web

