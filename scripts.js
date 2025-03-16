import { RandomRGBColor } from "./utils.mjs";
import { imageToAscii } from "./asciiArt.js";

function increment () {
    console.log("Incrementing counter");
    const span = document.querySelector("#counter span");
    const currentValue = parseInt(span.textContent, 10);
    const newValue = currentValue + 1;
    span.textContent = newValue;
}

document.addEventListener("DOMContentLoaded", function() {
    drawHolmes();
    const button = document.querySelector("#counter button");
    button.addEventListener("click", function() {
        document.documentElement.style.backgroundColor = RandomRGBColor();
        console.log("Button clicked");
        increment();
    });
});


async function drawHolmes () {
    const ascii = document.getElementById("ascii");
    const asciiText = await imageToAscii('images/Crest.png', 2, 4, true);

    ascii.textContent = asciiText;
}