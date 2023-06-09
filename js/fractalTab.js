import { redrawAllFractals } from "./Fractal.js";

const fractalTabs = document.getElementById('fractalTabs');
let index = 0;

export default function makeTab(fractal, canvas, fractals){
    index++;

    const fractalTab = document.createElement('div');
    const fractalProfile = document.createElement('div');
    const fractalName = document.createElement('h3');
    const fractalMiniImage = document.createElement('canvas');
    const ctx = fractalMiniImage.getContext('2d');
    const fractalPropertiesContainer = document.createElement('div');
    const closeBtn = document.createElement('ion-icon');
    closeBtn.name = "close-outline";

   
    fractalTab.classList.add('fractal-tab');
    fractalProfile.classList.add('fractal-profile');
    fractalName.classList.add('fractal-name');
    fractalMiniImage.classList.add('fractal-mini-image');
    fractalPropertiesContainer.classList.add("fractal-properties");
    closeBtn.classList.add("fractal-close");

    fractalName.appendChild(document.createTextNode("Fractal_" + index));

   
    let properties = [
        {
            name: "x",
            value: fractal.x,
        },
        {
            name: "y",
            value: fractal.y,
        },
        {
            name: "Rotation",
            value: fractal.rotation,
        },
        {
            name: "Scale",
            value: fractal.scale,
        }
    ]

    properties.forEach(property => {
        const propertyContainer = document.createElement("div");
        const propertyLabel = document.createElement("p");
        const propertyInput = document.createElement("input");

        propertyLabel.appendChild(document.createTextNode(`${property.name}: `));
        propertyInput.value = property.value;

        propertyContainer.appendChild(propertyLabel);
        propertyContainer.appendChild(propertyInput);

        fractalPropertiesContainer.appendChild(propertyContainer);

        propertyInput.addEventListener("change", e => {
            property.value = parseInt(e.target.value);
            
            fractal.x = properties[0].value;
            fractal.y = properties[1].value;
            fractal.rotation = properties[2].value;
            fractal.scale = properties[3].value;

            redrawAllFractals(fractals, canvas.getContext("2d"));
        });
    });

    closeBtn.addEventListener("click", function(){
        fractalTabs.removeChild(fractalTab);
        fractals.splice(fractals.indexOf(fractal), 1);
        console.log(fractals);
        redrawAllFractals(fractals, canvas.getContext("2d"));
    })

    fractalProfile.appendChild(fractalName);
    fractalProfile.appendChild(fractalMiniImage);

    fractalTab.appendChild(closeBtn);
    fractalTab.appendChild(fractalProfile);
    fractalTab.appendChild(fractalPropertiesContainer);

    fractalTabs.appendChild(fractalTab);

    fractal.name = "Fractal_" + index;

    fractal.fractalImage.onload = () => {
        const imageWidth = 300;
        const imageHeight = 200;
        ctx.drawImage(fractal.fractalImage, fractalMiniImage.width / 2 - imageWidth / 2, fractalMiniImage.height / 2 - imageHeight / 2, imageWidth, imageHeight);
    
        //fractal.drawFractalImage(canvas.getContext("2d"));

        fractals.forEach(fractal => {
            fractal.drawFractalImage(canvas.getContext("2d"));
        })

    }
}
