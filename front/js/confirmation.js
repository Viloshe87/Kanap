//récupérer les paramètres d’URL//
    let str = window.location.href;
    let url = new URL(str);
    let orderId = url.searchParams.get("order");
    document.getElementById('orderId').innerHTML = orderId;