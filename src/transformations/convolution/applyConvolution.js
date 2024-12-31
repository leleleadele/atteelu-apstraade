// no MD1
import setPixel from "../_helpers/setPixel";

const applyConvolution = (sourceImageData, outputImageData, kernel) => {
  const sourceImagePixelData = sourceImageData.data;
  const outputImagePixelData = outputImageData.data;
  const imageWidth = sourceImageData.width;
  const imageHeight = sourceImageData.height;

  // aprēķina izmantotā kernela režģa malas garumu
  // (būtībā jau zinām, ka kernelSideLength būs 3 un kernelHalfSideLength būs 1,
  // jo izmantoju 3x3 Gausa kernel)
  const kernelSideLength = Math.round(Math.sqrt(kernel.length));
  const kernelHalfSideLength = Math.floor(kernelSideLength / 2);

  // cikliska iešana cauri gala attēla pikseļiem, kur y - pikseļa rindas indekss, x - kolonnas indekss
  for (let y = 0; y < imageHeight; y++) {
    for (let x = 0; x < imageWidth; x++) {
      let [r, g, b, a] = [0, 0, 0, 0];

      // cikliska iešana cauri konvolūcijas kernel rūtīm
      // lai iegūtu RGBA vērtības, kuras beigās piešķirt pikselim pie tekošā x, y
      for (let kernelY = 0; kernelY < kernelSideLength; kernelY++) {
        for (let kernelX = 0; kernelX < kernelSideLength; kernelX++) {
          // srcY, srcX ir oriģinālā attēla pikseļa koordinātas attiecībā pret kernel pozīciju
          const srcY = y + kernelY - kernelHalfSideLength;
          const srcX = x + kernelX - kernelHalfSideLength;

          // pārbauda, vai pikselis neatrodas ārpus bildes
          if (
            srcY >= 0 &&
            srcY < imageHeight &&
            srcX >= 0 &&
            srcX < imageWidth
          ) {
            // atrod pikseli attēlā pēc rindas un kolonnas indeksiem
            // 4 atbilst RGBA kanālu skaitam
            const srcPixelIndex = (srcY * imageWidth + srcX) * 4;

            // sameklē konvolūcijas "svaru" pie oriģinālā attēla pikseļa
            const weight = kernel[kernelY * kernelSideLength + kernelX];

            r += sourceImagePixelData[srcPixelIndex] * weight;
            g += sourceImagePixelData[srcPixelIndex + 1] * weight;
            b += sourceImagePixelData[srcPixelIndex + 2] * weight;
            a += sourceImagePixelData[srcPixelIndex + 3] * weight;
          }
        }
      }

      // ievieto aprēķināto pikseli jaunajā, iegūstamajā attēlā
      setPixel(outputImagePixelData, imageWidth, x, y, [r, g, b, a]);
    }
  }

  return outputImageData;
};

export default applyConvolution;
