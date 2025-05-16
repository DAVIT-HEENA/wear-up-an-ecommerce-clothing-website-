console.clear();

// Helper: get query param by name
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Helper: fetch product by id from API
function fetchProductById(id) {
    return fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + id)
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        });
}

// Main logic to load product
function loadProductAndRender() {
    let product = null;
    try {
        product = JSON.parse(localStorage.getItem('selectedProduct'));
        if (product && product.id) {
            dynamicContentDetails(product);
            return;
        }
    } catch (e) {
        // ignore, fallback to URL param
    }
    // Try to get id from URL
    const id = getQueryParam('id');
    if (id) {
        // Show loading message
        const container = document.getElementById('containerProduct');
        if (container) container.innerHTML = '<h2>Loading product details...</h2>';
        fetchProductById(id)
            .then(productData => {
                if (!productData || !productData.id) throw new Error('Product not found');
                dynamicContentDetails(productData);
            })
            .catch(err => {
                if (container) container.innerHTML = '<h2>Product not found. Please try again.</h2>';
                console.error('Failed to fetch product:', err);
            });
    } else {
        const container = document.getElementById('containerProduct');
        if (container) container.innerHTML = '<h2>Product not found!</h2>';
    }
}

function dynamicContentDetails(ob) {
    let containerProduct = document.getElementById('containerProduct');
    if (!containerProduct) return;

    // Check for required fields
    if (!ob || !ob.name || !ob.brand || !ob.price || !ob.description || !ob.preview) {
        containerProduct.innerHTML = '<h2>Product not found or incomplete data.</h2>';
        return;
    }

    // Clear any placeholder/default HTML
    containerProduct.innerHTML = '';

    let mainContainer = document.createElement('div');
    mainContainer.id = 'containerD';

    // Image section
    let imageSectionDiv = document.createElement('div');
    imageSectionDiv.id = 'imageSection';

    let imgTag = document.createElement('img');
    imgTag.id = 'imgDetails';
    imgTag.src = ob.preview;
    imgTag.alt = ob.name;

    imageSectionDiv.appendChild(imgTag);

    // Product details section
    let productDetailsDiv = document.createElement('div');
    productDetailsDiv.id = 'productDetails';

    let h1 = document.createElement('h1');
    h1.innerText = ob.name;

    let h4 = document.createElement('h4');
    h4.innerText = ob.brand;

    let detailsDiv = document.createElement('div');
    detailsDiv.id = 'details';

    let h3DetailsDiv = document.createElement('h3');
    h3DetailsDiv.innerText = 'Rs ' + ob.price;

    let h3 = document.createElement('h3');
    h3.innerText = 'Description';

    let para = document.createElement('p');
    para.innerText = ob.description;

    // Product preview section
    let productPreviewDiv = document.createElement('div');
    productPreviewDiv.id = 'productPreview';

    let h3ProductPreviewDiv = document.createElement('h3');
    h3ProductPreviewDiv.innerText = 'Product Preview';

    productPreviewDiv.appendChild(h3ProductPreviewDiv);

    if (Array.isArray(ob.photos) && ob.photos.length > 0) {
        ob.photos.forEach((photo, index) => {
            let previewImg = document.createElement('img');
            previewImg.className = 'previewImg';
            previewImg.src = photo;
            previewImg.alt = ob.name + ' preview ' + (index + 1);

            if (index === 0) {
                previewImg.classList.add('active');
            }

            previewImg.onclick = function () {
                imgTag.src = this.src;
                document.querySelectorAll('.previewImg').forEach(img => img.classList.remove('active'));
                this.classList.add('active');
            };

            productPreviewDiv.appendChild(previewImg);
        });
    }

    // Button section
    let buttonDiv = document.createElement('div');
    buttonDiv.id = 'button';

    let buttonTag = document.createElement('button');
    buttonTag.innerText = 'Add to Cart';

    buttonTag.onclick = function () {
        // Check if user is logged in
        fetch('check_auth.php')
            .then(response => response.json())
            .then(data => {
                if (data.isLoggedIn) {
                    // User is logged in, proceed with adding to cart
                    let orderIds = JSON.parse(localStorage.getItem('orderIds') || '[]');
                    orderIds.push(ob.id);
                    localStorage.setItem('orderIds', JSON.stringify(orderIds));
                    localStorage.setItem('cartCount', orderIds.length);
                    updateCartBadge();
                } else {
                    // User is not logged in, redirect to login page
                    window.location.href = 'login.html';
                }
            })
            .catch(error => {
                console.error('Error checking authentication:', error);
                window.location.href = 'login.html';
            });
    };

    buttonDiv.appendChild(buttonTag);

    // Assemble all sections
    containerProduct.appendChild(mainContainer);
    mainContainer.appendChild(imageSectionDiv);
    mainContainer.appendChild(productDetailsDiv);

    productDetailsDiv.appendChild(h1);
    productDetailsDiv.appendChild(h4);
    productDetailsDiv.appendChild(detailsDiv);
    detailsDiv.appendChild(h3DetailsDiv);
    detailsDiv.appendChild(h3);
    detailsDiv.appendChild(para);

    productDetailsDiv.appendChild(productPreviewDiv);
    productDetailsDiv.appendChild(buttonDiv);
}

// Update badge from localStorage on page load
function updateCartBadge() {
    let badge = document.getElementById("badge");
    let orderIds = JSON.parse(localStorage.getItem('orderIds') || '[]');
    let count = orderIds.length;
    if (badge) badge.innerHTML = count;
}
document.addEventListener('DOMContentLoaded', updateCartBadge);

// Start loading product
document.addEventListener('DOMContentLoaded', loadProductAndRender);
