console.log("MenuAR application initialized.");

window.addEventListener("load", () => {

    console.log("A-Frame loaded:", typeof AFRAME);
    console.log("THREE available:", typeof THREE);
    console.log("MeshoptDecoder available:", typeof MeshoptDecoder);
    console.log("THREE.GLTFLoader:", THREE.GLTFLoader);

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

        console.log("MeshoptDecoder connected to GLTFLoader.");

    } else {

        console.error(
            "Meshopt could not be connected because a required component is missing."
        );

    }

});