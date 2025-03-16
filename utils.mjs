/**
 * 
 * @returns {string} A random hex value between 0 and 255
 * @description Generates a random hex value for RGB color generation.
 * This function returns a random integer between 0 and 255, converts it to a hexadecimal string,
 * and ensures it is two characters long by padding with a leading zero if necessary.
 * The result is a string representing a hex value for color generation.
 */
function RandomHexValue () {
    return Math.floor( Math.random() * 255 ).toString(16);
}

/**
 * @returns {string} A random hex string (e.g., #23AF0E)
 */
function RandomRGBColor () {
    const red = RandomHexValue();
    const green = RandomHexValue();
    const blue = RandomHexValue();
    return `#${red}${green}${blue}`;
}

export {
    RandomRGBColor,
    RandomHexValue,
};