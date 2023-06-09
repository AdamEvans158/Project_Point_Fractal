import {nth_gon_scaler} from "./generateLoop.js";

const translateX = document.getElementById("tanslateXInput");
const translateY = document.getElementById("tanslateYInput");
const rotation = document.getElementById("rotationInput");
const amountOfSides = document.getElementById("amountOfSidesInput");
const scale = document.getElementById("scaleInput");
const rValue = document.getElementById("rValueSelection");
const complexity = document.getElementById("complexityInput");
const color1 = document.getElementById("gradientColor1Input");
const color2 = document.getElementById("gradientColor2Input");
const eleminationRules = Array(...document.getElementsByClassName("elemination-rule"));
const spliceRules = Array(...document.getElementsByClassName("splice-rule"));

export default function getProperties(){

    // Loop through array of all of the check boxes. The one with the greatest index and is checked will be selected.
    let eleminationRule;
    for(let i = 0; i < eleminationRules.length; i++){
    
        if(eleminationRules[i].checked){
            eleminationRule = "eleminationRule" + (1 + eleminationRules.indexOf(eleminationRules[i]));
        }
    
    }

    let spliceRule;
    for(let i = 0; i < spliceRules.length; i++){
    
        if(spliceRules[i].checked){
            spliceRule = "spliceRule" + (1 + spliceRules.indexOf(spliceRules[i]));
        }
    
    }    

    // Returns all the properties needed to create a new fractal. 
    return {
        x: parseInt(translateX.value),
        y: parseInt(translateY.value),
        rotation: parseInt(rotation.value),
        sides: parseInt(amountOfSides.value),
        scale: parseInt(scale.value),
        rValue: rValue.value == "1/2" ? 1/2 : nth_gon_scaler(parseInt(amountOfSides.value)),
        eleminationRule,
        spliceRule,
        complexity: parseInt(complexity.value),
        color1: color1.value,
        color2: color2.value
    }
}