import getPixel from '../_helpers/getPixel';

// "sigma" un "tau" ir mans mmēģinājums nosaukt tās konstantes, kas dotas teorijas materiālā dotajā Susan filtra formulā
// sigma ietekmē, cik ļoti distance no centrālā pikseļa maskā ietekmē aprēķināto svaru
// tau ietekmē, cik ļoti intensitāšu starpība ietekmē aprēķināto svaru
const applyAdaptiveSusanFilter = (imageData, sigma = 1.5, tau = 30) => {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;

  const resultData = new Uint8ClampedArray(data.length);

  // piemēro SUSAN filtru katram pikselim
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      for (let channel = 0; channel < 4; channel++) {
        const centerPixelValue = getPixel(data, width, x, y)[channel];

        let weightSum = 0;
        let weightedSum = 0;

        // centrālajam pikselim apliek apkārt apļveida masku
        // te mēs apskatām tos pikseļus, kas centrālajam pikselim maskas ietvaros ir "kaimiņos"
        for (let j = -Math.floor(sigma); j <= Math.floor(sigma); j++) {
          for (let i = -Math.floor(sigma); i <= Math.floor(sigma); i++) {
            const neighborPixelValue = getPixel(data, width, x + i, y + j)[channel];
            const distanceToCenter = Math.sqrt(i * i + j * j);

            // aprēķina svaru, balstoties uz pikseļa attālumu no maskas centra
            // un uz intensitāšu starpību starp filtrējamo pikseli un pikseli dotajā maskas pozīcijā
            const weight = Math.exp(-(distanceToCenter * distanceToCenter) / (2 * sigma * sigma) - ((centerPixelValue - neighborPixelValue) ** 2) / (2 * tau * tau));

            weightedSum += neighborPixelValue * weight;
            weightSum += weight;
          }
        }

        // aprēķina filtrējamā pikseļa vērtību
        const filteredValue = weightedSum / weightSum;

        // ieliek aprēķināto pikseli izvadāmajā attēlā
        resultData[(y * width + x) * 4 + channel] = filteredValue;
      }
    }
  }

  const outputImageData = new ImageData(new Uint8ClampedArray(resultData), width, height);
  return outputImageData;
};

export default applyAdaptiveSusanFilter;
