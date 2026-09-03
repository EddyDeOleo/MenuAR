console.log("MenuAR application initialized.");


/*
   =========================================
   APPLICATION STATE
   =========================================
*/

let products = [];


/*
   =========================================
   MENU ELEMENT
   =========================================
*/

const menuContainer =
    document.querySelector("#menuContainer");


/*
   =========================================
   GET CURRENT CATEGORY FROM URL
   =========================================

   Examples:

   /menu
   /menu/burgers
   /menu/salads
   /menu/entries
*/

function getCategoryFromUrl() {

    const path =
        window.location.pathname
            .replace(/\/+$/, "");


    /*
       Main menu.

       Both / and /menu show the
       complete menu.
    */

    if (
        path === "" ||
        path === "/" ||
        path === "/menu"
    ) {

        return null;

    }


    /*
       Remove the /menu/ part.

       Example:

       /menu/burgers
       ↓
       burgers
    */

    if (path.startsWith("/menu/")) {

        return path
            .substring("/menu/".length)
            .toLowerCase();

    }


    return null;

}


/*
   =========================================
   LOAD PRODUCT DATA
   =========================================
*/

async function loadProducts() {

    try {

        const response =
            await fetch("/data/products.json");


        if (!response.ok) {

            throw new Error(
                `Unable to load products.json. Status: ${response.status}`
            );

        }


        const data =
            await response.json();


        products =
            data.products || [];


        if (products.length === 0) {

            throw new Error(
                "No products were found in products.json."
            );

        }


        console.log(
            "MenuAR: Products loaded.",
            products
        );


        renderMenu();


    } catch (error) {

        console.error(
            "MenuAR: Unable to load product data.",
            error
        );

    }

}


/*
   =========================================
   RENDER MENU
   =========================================
*/

function renderMenu() {

    if (!menuContainer) {

        console.error(
            "MenuAR: Menu container was not found."
        );

        return;

    }


    menuContainer.innerHTML = "";


    /*
       Get the category requested by
       the current URL.

       null = show everything.
    */

    const requestedCategory =
        getCategoryFromUrl();


    console.log(
        "MenuAR: Requested category:",
        requestedCategory || "ALL"
    );


    /*
       Category order.
    */

    const categoryOrder = [
        "burgers",
        "salads",
        "entries"
    ];


    categoryOrder.forEach(category => {

        /*
           If a specific category was
           requested, ignore all others.
        */

        if (
            requestedCategory &&
            requestedCategory !== category
        ) {

            return;

        }


        const categoryProducts =
            products.filter(
                product =>
                    product.category === category
            );


        /*
           Do not create an empty category.
        */

        if (categoryProducts.length === 0) {

            return;

        }


        const categorySection =
            createCategorySection(
                category,
                categoryProducts
            );


        menuContainer.appendChild(
            categorySection
        );

    });


    /*
       Lazy-load 3D models.
    */

    setupLazyModelLoading();

}


/*
   =========================================
   CREATE CATEGORY SECTION
   =========================================
*/

function createCategorySection(
    category,
    categoryProducts
) {

    const section =
        document.createElement("section");


    section.className =
        "menu-category";


    section.id =
        category;


    const title =
        document.createElement("h2");


    title.className =
        "category-title";


    title.textContent =
        getCategoryName(category);


    section.appendChild(title);


    const productList =
        document.createElement("div");


    productList.className =
        "product-list";


    categoryProducts.forEach(product => {

        const card =
            createProductCard(product);


        productList.appendChild(card);

    });


    section.appendChild(productList);


    return section;

}


/*
   =========================================
   CATEGORY NAME
   =========================================
*/

function getCategoryName(category) {

    const categoryNames = {

        burgers: "BURGERS",

        salads: "SALADS",

        entries: "ENTRIES"

    };


    return (
        categoryNames[category] ||
        category.toUpperCase()
    );

}


/*
   =========================================
   CREATE PRODUCT CARD
   =========================================
*/

function createProductCard(product) {

    const card =
        document.createElement("article");


    card.className =
        "menu-card";


    card.dataset.productId =
        product.id;


    /*
       PRODUCT HEADER
    */

    const productHeader =
        document.createElement("div");


    productHeader.className =
        "product-header";


    const productInfo =
        document.createElement("div");


    productInfo.className =
        "product-info";


    const productName =
        document.createElement("h3");


    productName.textContent =
        product.name;


    const productDescription =
        document.createElement("p");


    productDescription.className =
        "product-description";


    productDescription.textContent =
        product.description;


    productInfo.appendChild(
        productName
    );


    productInfo.appendChild(
        productDescription
    );


    const productPrice =
        document.createElement("span");


    productPrice.className =
        "product-price";


    productPrice.textContent =
        product.price;


    productHeader.appendChild(
        productInfo
    );


    productHeader.appendChild(
        productPrice
    );


    /*
       PRODUCT VIEWER
    */

    const productViewerContainer =
        document.createElement("div");


    productViewerContainer.className =
        "product-viewer";


    const productViewer =
        document.createElement("model-viewer");


    productViewer.className =
        "product-model";


    /*
       Keep the model URL in a data
       attribute for lazy loading.
    */

    productViewer.dataset.modelUrl =
        product.modelUrl;


    productViewer.alt =
        `3D model of the ${product.name}`;


    productViewer.setAttribute(
        "ar",
        ""
    );


    productViewer.setAttribute(
        "ar-modes",
        "scene-viewer quick-look webxr"
    );


    productViewer.setAttribute(
        "ar-placement",
        "floor"
    );


    productViewer.setAttribute(
        "camera-controls",
        ""
    );


    productViewer.setAttribute(
        "shadow-intensity",
        "1"
    );


    productViewer.setAttribute(
        "exposure",
        "1"
    );


    productViewer.setAttribute(
        "interaction-prompt",
        "auto"
    );


    productViewer.style.setProperty(
        "--ar-button-display",
        "none"
    );


    /*
       CUSTOM AR BUTTON
    */

    const arButton =
        document.createElement("button");


    arButton.className =
        "ar-button";


    arButton.type =
        "button";


    arButton.textContent =
        "VIEW IN AR";


    arButton.hidden =
        true;


    /*
       Assemble viewer.
    */

    productViewerContainer.appendChild(
        productViewer
    );


    productViewerContainer.appendChild(
        arButton
    );


    /*
       Assemble card.
    */

    card.appendChild(
        productHeader
    );


    card.appendChild(
        productViewerContainer
    );


    /*
       Configure AR.
    */

    setupProductAR(
        productViewer,
        arButton,
        product
    );


    return card;

}


/*
   =========================================
   PRODUCT AR
   =========================================
*/

function setupProductAR(
    productViewer,
    arButton,
    product
) {

    if (!product.arEnabled) {

        return;

    }


    productViewer.addEventListener(
        "load",
        () => {

            console.log(
                `MenuAR: ${product.name} 3D model loaded.`
            );


            if (productViewer.canActivateAR) {

                arButton.hidden =
                    false;


                console.log(
                    `MenuAR: AR available for ${product.name}.`
                );

            } else {

                arButton.hidden =
                    true;


                console.log(
                    `MenuAR: AR unavailable for ${product.name}.`
                );

            }

        }
    );


    arButton.addEventListener(
        "click",
        async () => {

            console.log(
                `MenuAR: Starting AR for ${product.name}...`
            );


            try {

                await productViewer.activateAR();

            } catch (error) {

                console.error(
                    `MenuAR: Unable to start AR for ${product.name}.`,
                    error
                );

            }

        }
    );

}


/*
   =========================================
   LAZY MODEL LOADING
   =========================================
*/

function setupLazyModelLoading() {

    const viewers =
        document.querySelectorAll(
            ".product-model"
        );


    if (viewers.length === 0) {

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {

                        return;

                    }


                    const viewer =
                        entry.target;


                    /*
                       Prevent duplicate loading.
                    */

                    if (
                        viewer.src ||
                        viewer.dataset.loaded === "true"
                    ) {

                        observer.unobserve(
                            viewer
                        );

                        return;

                    }


                    const modelUrl =
                        viewer.dataset.modelUrl;


                    if (!modelUrl) {

                        return;

                    }


                    console.log(
                        "MenuAR: Loading 3D model.",
                        modelUrl
                    );


                    viewer.src =
                        modelUrl;


                    viewer.dataset.loaded =
                        "true";


                    observer.unobserve(
                        viewer
                    );

                });

            },
            {
                rootMargin: "300px 0px"
            }
        );


    viewers.forEach(viewer => {

        observer.observe(viewer);

    });

}


/*
   =========================================
   START APPLICATION
   =========================================
*/

loadProducts();