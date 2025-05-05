// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    let mainContainer = document.getElementById("mainContainer");
    let containerClothing = document.getElementById("containerClothing");
    let containerAccessories = document.getElementById("containerAccessories");

    if (!mainContainer || !containerClothing || !containerAccessories) {
        console.error("Required DOM elements not found");
        return;
    }

    function dynamicClothingSection(ob) {
        let boxDiv = document.createElement("div");
        boxDiv.id = "box";

        let boxLink = document.createElement("a");
        boxLink.href = "contentDetails.php";

        // Save the selected product to localStorage before navigating
        boxLink.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default navigation
            try {
                localStorage.setItem('selectedProduct', JSON.stringify(ob));
                window.location.href = "contentDetails.php"; // Navigate after saving
            } catch (error) {
                console.error("Failed to save product data:", error);
                alert("Failed to load product details. Please try again.");
            }
        });

        let imgTag = document.createElement("img");
        imgTag.src = ob.preview;
        imgTag.alt = ob.name;

        let detailsDiv = document.createElement("div");
        detailsDiv.id = "details";

        let h3 = document.createElement("h3");
        h3.innerText = ob.name;

        let h4 = document.createElement("h4");
        h4.innerText = ob.brand;

        let h2 = document.createElement("h2");
        h2.innerText = "Rs " + ob.price;

        detailsDiv.appendChild(h3);
        detailsDiv.appendChild(h4);
        detailsDiv.appendChild(h2);

        boxLink.appendChild(imgTag);
        boxLink.appendChild(detailsDiv);
        boxDiv.appendChild(boxLink);

        return boxDiv;
    }

    function getCookieValue(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
            if (cookieName === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return undefined;
    }

    // Fetch products from API
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                try {
                    let contentTitle = JSON.parse(this.responseText);

                    // Remove cookie-based badge update
                    // let counter = getCookieValue('counter');
                    // let badge = document.getElementById("badge");
                    // if (badge && counter) badge.innerHTML = counter;
                    if (window.updateCartBadge) window.updateCartBadge();

                    // Clear containers before appending
                    containerClothing.innerHTML = '';
                    containerAccessories.innerHTML = '';

                    for (let i = 0; i < contentTitle.length; i++) {
                        if (contentTitle[i].isAccessory) {
                            containerAccessories.appendChild(dynamicClothingSection(contentTitle[i]));
                        } else {
                            containerClothing.appendChild(dynamicClothingSection(contentTitle[i]));
                        }
                    }
                } catch (error) {
                    console.error("Failed to parse product data:", error);
                    mainContainer.innerHTML = '<h2>Failed to load products. Please try again later.</h2>';
                }
            } else {
                console.error("Failed to fetch products:", this.status);
                mainContainer.innerHTML = '<h2>Failed to load products. Please try again later.</h2>';
            }
        }
    };
    httpRequest.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
    httpRequest.send();
});
