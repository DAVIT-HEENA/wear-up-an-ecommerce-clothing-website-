console.clear();

function updateCartBadge() {
    let badge = document.getElementById("badge");
    let orderIds = JSON.parse(localStorage.getItem('orderIds') || '[]');
    let count = orderIds.length;
    if (badge) badge.innerHTML = count;
}
document.addEventListener('DOMContentLoaded', updateCartBadge);

let cartContainer = document.getElementById('cartContainer')
let boxContainerDiv = document.createElement('div')
boxContainerDiv.id = 'boxContainer'

function dynamicCartSection(ob, itemCounter) {
    let boxDiv = document.createElement('div');
    boxDiv.id = 'box-' + ob.id;
    boxContainerDiv.appendChild(boxDiv);

    let boxImg = document.createElement('img');
    boxImg.src = ob.preview;
    boxDiv.appendChild(boxImg);

    let boxh3 = document.createElement('h3');
    let h3Text = document.createTextNode(ob.name + ' × ');
    boxh3.appendChild(h3Text);

    let minusBtn = document.createElement('button');
    minusBtn.innerText = '-';
    minusBtn.style.margin = '0 5px';
    minusBtn.onclick = function() {
        updateProductQuantity(ob.id, -1, boxDiv, boxh3);
    };
    boxh3.appendChild(minusBtn);

    let qtySpan = document.createElement('span');
    qtySpan.innerText = itemCounter;
    qtySpan.style.margin = '0 5px';
    qtySpan.id = 'qty-' + ob.id;
    boxh3.appendChild(qtySpan);

    let plusBtn = document.createElement('button');
    plusBtn.innerText = '+';
    plusBtn.style.margin = '0 5px';
    plusBtn.onclick = function() {
        updateProductQuantity(ob.id, 1, boxDiv, boxh3);
    };
    boxh3.appendChild(plusBtn);

    boxDiv.appendChild(boxh3);

    let boxh4 = document.createElement('h4');
    let h4Text = document.createTextNode('Amount: Rs' + ob.price);
    boxh4.appendChild(h4Text);
    boxh4.id = 'amount-' + ob.id;
    boxDiv.appendChild(boxh4);

    cartContainer.appendChild(boxContainerDiv);
    cartContainer.appendChild(totalContainerDiv);
    return cartContainer;
}

function updateProductQuantity(productId, change, boxDiv, boxh3) {
    let orderIds = JSON.parse(localStorage.getItem('orderIds') || '[]');
    if (change === 1) {
        orderIds.push(productId);
    } else if (change === -1) {
        let idx = orderIds.indexOf(productId);
        if (idx !== -1) orderIds.splice(idx, 1);
    }
    localStorage.setItem('orderIds', JSON.stringify(orderIds));
    localStorage.setItem('cartCount', orderIds.length);
    if (window.updateCartBadge) window.updateCartBadge();

    let itemCountMap = {};
    orderIds.forEach(function(id) {
        itemCountMap[id] = (itemCountMap[id] || 0) + 1;
    });
    let qty = itemCountMap[productId] || 0;
    let qtySpan = document.getElementById('qty-' + productId);
    if (qtySpan) qtySpan.innerText = qty;

    if (qty === 0 && boxDiv) {
        boxDiv.remove();
    }

    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true);
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            let contentTitle = JSON.parse(httpRequest.responseText);
            let product = contentTitle.find(p => p.id == productId);
            if (product) {
                let amount = Number(product.price) * qty;
                let amountElem = document.getElementById('amount-' + productId);
                if (amountElem) amountElem.innerText = 'Amount: Rs' + amount;
            }
            updateTotalAmount();
        }
    };
    httpRequest.send();
}

function updateTotalAmount() {
    let orderIds = JSON.parse(localStorage.getItem('orderIds') || '[]');
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true);
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            let contentTitle = JSON.parse(httpRequest.responseText);
            let itemCountMap = {};
            orderIds.forEach(function(id) {
                itemCountMap[id] = (itemCountMap[id] || 0) + 1;
            });
            let totalAmount = 0;
            Object.keys(itemCountMap).forEach(function(id) {
                let product = contentTitle.find(p => p.id == id);
                if (product) {
                    totalAmount += Number(product.price) * itemCountMap[id];
                }
            });
            totalDiv.innerHTML = '';
            let totalh2 = document.createElement('h2');
            let h2Text = document.createTextNode('Total Amount');
            totalh2.appendChild(h2Text);
            totalDiv.appendChild(totalh2);
            let totalh4 = document.createElement('h4');
            let totalh4Text = document.createTextNode('Amount: Rs ' + totalAmount);
            totalh4Text.id = 'toth4';
            totalh4.appendChild(totalh4Text);
            totalDiv.appendChild(totalh4);
            if (!buttonDiv.parentNode) {
                totalDiv.appendChild(buttonDiv);
            }
        }
    };
    httpRequest.send();
}

let totalContainerDiv = document.createElement('div')
totalContainerDiv.id = 'totalContainer'

let totalDiv = document.createElement('div')
totalDiv.id = 'total'
totalContainerDiv.appendChild(totalDiv)

let totalh2 = document.createElement('h2')
let h2Text = document.createTextNode('Total Amount')
totalh2.appendChild(h2Text)
totalDiv.appendChild(totalh2)

function amountUpdate(amount)
{
    let totalh4 = document.createElement('h4')
    let totalh4Text = document.createTextNode('Amount: Rs ' + amount)
    totalh4Text.id = 'toth4'
    totalh4.appendChild(totalh4Text)
    totalDiv.appendChild(totalh4)
    if (!buttonDiv.parentNode) {
        totalDiv.appendChild(buttonDiv);
    }
    console.log(totalh4);
}

let buttonDiv = document.createElement('div')
buttonDiv.id = 'button'
totalDiv.appendChild(buttonDiv)

let buttonTag = document.createElement('button')
buttonDiv.appendChild(buttonTag)

let buttonText = document.createTextNode('Place Order')
buttonTag.appendChild(buttonText)

// buttonTag.onclick = function() {
//     fetch('check_auth.php')
//         .then(response => response.json())
//         .then(data => {
//             if (data.isLoggedIn) {
//                 window.location.href = 'orderPlaced.html';
//             } else {
//                 window.location.href = 'login.html';
//             }
//         })
//         .catch(error => {
//             console.error('Error checking authentication:', error);
//             window.location.href = 'login.html';
//         });
// }
buttonTag.onclick = function () {
    let orderIds = JSON.parse(localStorage.getItem('orderIds') || '[]');
    if (orderIds.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    fetch('check_auth.php')
        .then(response => response.json())
        .then(data => {
            if (!data.isLoggedIn) {
                window.location.href = 'login.html';
                return;
            }

            let itemCountMap = {};
            orderIds.forEach(id => {
                itemCountMap[id] = (itemCountMap[id] || 0) + 1;
            });

            fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product')
                .then(res => res.json())
                .then(productsData => {
                    let totalAmount = 0;
                    let orderDetails = [];

                    for (let id in itemCountMap) {
                        let product = productsData.find(p => p.id == id);
                        if (product) {
                            let qty = itemCountMap[id];
                            totalAmount += Number(product.price) * qty;
                            orderDetails.push({ id, name: product.name, qty });
                        }
                    }

                    // Send order to backend
                    fetch('place_order.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            amount: totalAmount,
                            products: orderDetails
                        })
                    })
                        .then(res => res.json())
                        .then(response => {
                            if (response.success) {
                                localStorage.removeItem('orderIds');
                                updateCartBadge();
                                window.location.href = 'orderPlaced.html';
                            } else {
                                alert('Order failed: ' + response.message);
                            }
                        })
                        .catch(err => {
                            console.error('Error placing order:', err);
                        });
                });
        });
};

function renderCart() {
    boxContainerDiv.innerHTML = '';
    totalDiv.innerHTML = '';
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true);
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            let contentTitle = JSON.parse(httpRequest.responseText);
            let orderIds = JSON.parse(localStorage.getItem('orderIds') || '[]');
            let counter = orderIds.length;
            document.getElementById("totalItem").innerHTML = ('Total Items: ' + counter);
            if (orderIds && counter > 0) {
                let itemCountMap = {};
                orderIds.forEach(function(id) {
                    itemCountMap[id] = (itemCountMap[id] || 0) + 1;
                });
                let totalAmount = 0;
                Object.keys(itemCountMap).forEach(function(id) {
                    let product = contentTitle.find(p => p.id == id);
                    if (product) {
                        totalAmount += Number(product.price) * itemCountMap[id];
                        dynamicCartSection(product, itemCountMap[id]);
                    }
                });
                amountUpdate(totalAmount);
            } else {
                document.getElementById("cartContainer").innerHTML = '<h2>Your cart is empty.</h2>';
                document.getElementById("totalItem").innerHTML = 'Total Items: 0';
            }
        }
    };
    httpRequest.send();
}

renderCart();

