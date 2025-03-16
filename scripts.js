import { RandomRGBColor } from "./utils.mjs";

function increment () {
    console.log("Incrementing counter");
    const span = document.querySelector("#counter span");
    const currentValue = parseInt(span.textContent, 10);
    const newValue = currentValue + 1;
    span.textContent = newValue;
}

document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector("#counter button");
    button.addEventListener("click", function() {
        document.documentElement.style.backgroundColor = RandomRGBColor();
        console.log("Button clicked");
        increment();
    });
});
