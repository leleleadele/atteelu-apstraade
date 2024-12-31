import hsiToRgb from "./hsiToRgb";
import rgbToHsi from "./rgbToHsi";

const changeHue = (imageData, outputImageData, deltaHue) => {
  const data = imageData.data;
  const outputData = outputImageData.data;

  // te nav svarīgi sekot līdzi pikseļa pozīcijai pēc rindas, kolonnas
  // tāpēc vienkārši ejam cauri visai px virknei
  for (let i = 0; i < data.length; i += 4) {
    // sākotnējās RGB vērtības
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    // pārkonvertē RGB uz HSI
    const [hue, saturation, intensity] = rgbToHsi(red, green, blue);

    // piemēro deltaHue pie iepriekš iegūtā hue parametra
    // lai iegūtu jauno hue
    let modifiedHue = (hue + deltaHue) % 360;

    // pārnesam jauno HSI atpakaļ uz RGB, kas nepieciešams attēla renderēšanai
    const [r, g, b] = hsiToRgb(modifiedHue, saturation, intensity);

    // piemērojam jauniegūtās RGBA vērtības transformētās bildes datiem
    outputData[i] = r;
    outputData[i + 1] = g;
    outputData[i + 2] = b;
    outputData[i + 3] = data[i + 3]; // A kanālu atstāj, kāds bijis
  }

  return outputImageData;
}

export default changeHue;
