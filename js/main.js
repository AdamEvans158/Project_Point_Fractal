import Fractal from "./Fractal.js";
import getProperties from "./getFractalProperties.js";
import makeTab from "./fractalTab.js";

const canvas = document.getElementById("canvas");
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

const ctx = canvas.getContext("2d");

ctx.translate(canvas.width / 2, canvas.height / 2);

let fractals = [];

const newFractal = document.getElementById("newFractal");

// Adds new fractals to canvas and creates a new fractal tab.
newFractal.addEventListener("click", () => {
    const fractal = new Fractal(getProperties(), canvas, ctx);
    fractals.push(fractal);
    makeTab(fractal, canvas, fractals, "down");
})

// Toggle fractal tabs when the arrow is clicked
const tabsArrow = document.getElementById("fractalArrow");
let arrowDirection = "up";
tabsArrow.addEventListener("click", () => {
    const tabs = Array(...document.getElementsByClassName("fractal-tab")); // Array of all fractal tabs
    if(arrowDirection === "down"){
        tabsArrow.style.transform = "rotate(180deg)";
        tabs.forEach((tab) => {
            tab.style.display = "none";
        });
        arrowDirection = "up";
    } else {
        tabsArrow.style.transform = "rotate(360deg)";
        tabs.forEach((tab) => {
            tab.style.display = "flex";
        });
        arrowDirection = "down";
    }

});

// Loads color gradient preview
const color1Input = document.getElementById("gradientColor1Input");
const color2Input = document.getElementById("gradientColor2Input");
const gradientCanvas = document.getElementById("gradientCanvas");
const gradientContext = gradientCanvas.getContext("2d");

function loadGradientPreview() {
    let gradient = gradientContext.createLinearGradient(0, 0, gradientCanvas.width, gradientCanvas.height / 2);
    gradient.addColorStop(0, color1Input.value);
    gradient.addColorStop(1, color2Input.value)
    gradientContext.fillStyle = gradient;
    gradientContext.fillRect(0, 0, gradientCanvas.width, gradientCanvas.height);
}

const isColor = (strColor) => {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== '';
}
loadGradientPreview();

color1Input.addEventListener("input", (e) => {
    if(isColor(e.target.value)) loadGradientPreview();
})

color2Input.addEventListener("input", (e) => {
    if(isColor(e.target.value))loadGradientPreview();
})

// Download image to computer
const imageDownloadBtn = document.getElementById("downloadPNG");
const downloadLink = document.getElementById("downloadLink");

imageDownloadBtn.addEventListener("click", () => {
    const canvasData = canvas.toDataURL("image/png");
    downloadLink.href = canvasData;
});