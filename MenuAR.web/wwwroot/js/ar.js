console.log("MenuAR AR experience initialized.");

window.addEventListener("load", () => {

    console.log("A-Frame:", typeof AFRAME);
    console.log("THREE:", typeof THREE);
    console.log("MeshoptDecoder:", typeof MeshoptDecoder);

    /*
     * Connect Meshopt to the GLTFLoader used by A-Frame.
     */

    if (
        typeof THREE !== "undefined" &&
        typeof THREE.GLTFLoader !== "undefined" &&
        typeof MeshoptDecoder !== "undefined"
    ) {

        const originalLoad = THREE.GLTFLoader.prototype.load;

        THREE.GLTFLoader.prototype.load = function (
            url,
            onLoad,
            onProgress,
            onError
        ) {

            this.setMeshoptDecoder(MeshoptDecoder);

            return originalLoad.call(
                this,
                url,
                onLoad,
                onProgress,
                onError
            );
        };

        console.log(
            "MeshoptDecoder connected to GLTFLoader."
        );

    } else {

        console.error(
            "Meshopt could not be connected to GLTFLoader."
        );

    }


    /*
     * MindAR events
     */

    const scene = document.querySelector("a-scene");

    if (!scene) {
        console.error("A-Frame scene not found.");
        return;
    }


    scene.addEventListener("arReady", () => {

        console.log(
            "MindAR: AR system ready."
        );

    });


    scene.addEventListener("targetFound", () => {

        console.log(
            "MindAR: image target found."
        );

    });


    scene.addEventListener("targetLost", () => {

        console.log(
            "MindAR: image target lost."
        );

    });


    scene.addEventListener("arError", (event) => {

        console.error(
            "MindAR: AR error.",
            event
        );

    });

});