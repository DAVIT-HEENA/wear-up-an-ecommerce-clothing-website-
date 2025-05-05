// Get cart data from localStorage
let orderIds = JSON.parse(localStorage.getItem('orderIds') || '[]');
let totalAmount = 0;
let products = [];

// Fetch product details to get prices and names
let httpRequest = new XMLHttpRequest();
let method = "GET";
let jsonRequestURL = "https://5d76bf96515d1a0014085cf9.mockapi.io/product";

httpRequest.open(method, jsonRequestURL, true);
httpRequest.onreadystatechange = function() {
    if(httpRequest.readyState == 4 && httpRequest.status == 200) {
        let allProducts = JSON.parse(httpRequest.responseText);
        let itemCountMap = {};
        orderIds.forEach(function(id) {
            itemCountMap[id] = (itemCountMap[id] || 0) + 1;
        });
        Object.keys(itemCountMap).forEach(function(id) {
            let product = allProducts.find(p => p.id == id);
            if (product) {
                totalAmount += Number(product.price) * itemCountMap[id];
                products.push({ id: product.id, name: product.name, quantity: itemCountMap[id], price: product.price });
            }
        });
        // Send order as JSON
        let orderData = {
            amount: totalAmount,
            products: products,
            date: new Date().toISOString()
        };
        let postRequest = new XMLHttpRequest();
        postRequest.open("POST", "https://5d76bf96515d1a0014085cf9.mockapi.io/order", true);
        postRequest.setRequestHeader("Content-Type", "application/json");
        postRequest.onreadystatechange = function() {
            if (postRequest.readyState === 4 && postRequest.status === 201) {
                // Clear cart after successful order
                localStorage.removeItem('orderIds');
                localStorage.setItem('cartCount', 0);
                if (window.updateCartBadge) window.updateCartBadge();
            }
        };
        postRequest.send(JSON.stringify(orderData));
    }
}
httpRequest.send();
