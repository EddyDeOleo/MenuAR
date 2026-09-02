console.log("MenuAR application initialized.");

const modelViewer = document.querySelector("#cheeseBombViewer");
const arButton = document.querySelector("#arButton");


if (modelViewer && arButton) {

    /*
       AR button is hidden by default.
    */

    arButton.hidden = true;


    /*
       Wait until the 3D model has loaded.
    */

    modelViewer.addEventListener("load", () => {

        console.log("MenuAR: 3D model loaded.");


        /*
           Check whether AR can be activated
           on this device.
        */

        if (modelViewer.canActivateAR) {

            arButton.hidden = false;

            console.log(
                "MenuAR: AR is available on this device."
            );

        } else {

            arButton.hidden = true;

            console.log(
                "MenuAR: AR is not available on this device."
            );

        }

    });


    /*
       Custom AR button.
    */

    arButton.addEventListener("click", async () => {

        console.log("MenuAR: Starting AR...");


        try {

            await modelViewer.activateAR();

        } catch (error) {

            console.error(
                "MenuAR: Unable to start AR.",
                error
            );

        }

    });

}