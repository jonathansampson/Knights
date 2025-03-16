// asciiArt.js

// Load an image and convert it to an ASCII art representation.
// This is the main function intended for external use.
//
// Usage:
// imageToAscii('path/to/image.jpg', 10, 20)
//   .then(asciiArt => console.log(asciiArt))
//   .catch(error => console.error(error));
//
// Parameters:
// - imagePath: URL or path to the image file
// - chunkWidth: width of pixel chunks (default is 10)
// - chunkHeight: height of pixel chunks (default is 20)
export async function imageToAscii(imagePath, chunkWidth, chunkHeight, reverse = false) {
  const defaultChunkWidth = 10;
  const defaultChunkHeight = 20;

  // Set default chunk sizes if none provided
  if (!chunkWidth) chunkWidth = defaultChunkWidth;
  if (!chunkHeight) chunkHeight = defaultChunkHeight;

  // Load image and draw to canvas
  const result = await loadImageToCanvas(imagePath);
  const canvas = result.canvas;
  const context = result.context;

  // Extract pixel data from the canvas
  const pixelData = getPixelData(context, canvas.width, canvas.height);

  // Calculate brightness values for pixel chunks
  const brightnessChunks = getBrightnessChunks(pixelData, canvas.width, canvas.height, chunkWidth, chunkHeight);

  // Generate and return ASCII art from brightness values
  return convertChunksToAscii(brightnessChunks, reverse);
}

// Load an image file into an invisible drawing area (canvas).
// This function is for internal use only.
function loadImageToCanvas(imagePath) {
  return new Promise(function(resolve, reject) {
    const image = new Image();
    image.src = imagePath;
    image.crossOrigin = "Anonymous";

    image.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);

      resolve({ canvas: canvas, context: context });
    };

    image.onerror = function() {
      reject(new Error('Failed to load image.'));
    };
  });
}

// Retrieve the pixel data from the canvas.
// Internal function, not exported.
function getPixelData(context, width, height) {
  return context.getImageData(0, 0, width, height);
}

// Calculate brightness values for chunks of pixels in the image.
// Internal function, not exported.
function getBrightnessChunks(pixelDataObject, imageWidth, imageHeight, chunkWidth, chunkHeight) {
  const pixelData = pixelDataObject.data;
  const brightnessChunks = [];

  for (let y = 0; y < imageHeight; y += chunkHeight) {
    const rowBrightness = [];

    for (let x = 0; x < imageWidth; x += chunkWidth) {
      const brightness = calculateChunkBrightness(
        pixelData,
        x,
        y,
        chunkWidth,
        chunkHeight,
        imageWidth,
        imageHeight
      );

      rowBrightness.push(brightness);
    }

    brightnessChunks.push(rowBrightness);
  }

  return brightnessChunks;
}

// Convert brightness chunks into an ASCII art string.
// Internal function, not exported.
function convertChunksToAscii(brightnessChunks, reverse = false) {
  let asciiArt = '';

  for (let rowIndex = 0; rowIndex < brightnessChunks.length; rowIndex++) {
    const row = brightnessChunks[rowIndex];
    let asciiRow = '';

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const brightness = row[colIndex];
      asciiRow += brightnessToCharacter(brightness, reverse);
    }

    asciiArt += asciiRow + '\n';
  }

  return asciiArt;
}

// Calculate the brightness of a single pixel.
// Internal helper function.
function calculatePixelBrightness(red, green, blue) {
  return (red + green + blue) / 3;
}

// Calculate the average brightness of a chunk of pixels.
// Internal helper function.
function calculateChunkBrightness(pixelData, startX, startY, chunkWidth, chunkHeight, imageWidth, imageHeight) {
  let totalBrightness = 0;
  let pixelsCounted = 0;

  for (let y = startY; y < startY + chunkHeight && y < imageHeight; y++) {
    for (let x = startX; x < startX + chunkWidth && x < imageWidth; x++) {
      const pixelIndex = (y * imageWidth + x) * 4;
      const red = pixelData[pixelIndex];
      const green = pixelData[pixelIndex + 1];
      const blue = pixelData[pixelIndex + 2];

      totalBrightness += calculatePixelBrightness(red, green, blue);
      pixelsCounted++;
    }
  }

  return totalBrightness / pixelsCounted;
}

// Convert a brightness value to an ASCII character.
// Internal helper function.
function brightnessToCharacter(brightness, reverse = false) {
  const characters = !reverse ? '@%#*+=-:. ' : ' .:-=+*#%@';
  const numberOfCharacters = characters.length;

  const index = Math.floor((brightness / 255) * (numberOfCharacters - 1));
  return characters[index];
}
