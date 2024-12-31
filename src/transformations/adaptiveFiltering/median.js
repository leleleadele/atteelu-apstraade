import getPixel from '../_helpers/getPixel';

// Adaptīvā filtrēša veikta ar mediānas, ne SUSAN filtru
// squareSizeMax atbilst maksimālā mediānas filtram atlasāmā pikseļu laukuma/kvadrāta malas garumam,
// defaultā vērtība 5, jo pie tās lietotne vēl būtiski nesāk bremzēt
const applyAdaptiveMedianFilter = (imageData, squareSizeMax = 5) => {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;

  // Minimālais kvadrāta izmērs mediānas vērtību atlasei (atlasāmā kvadrāta malas garums)
  const squareSizeMin = 3; 

  const resultData = new Uint8ClampedArray(data.length);

  // Piemēro adaptīvo mediānas filtru katram pikselim, 
  // sekojot pikseļa rindas/kolonnas pozīcijai
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      for (let channel = 0; channel < 4; channel++) {
        const squares = [];

        // Iet cauri dažādiem mediānu apkārtnes kvadrātiem no min līdz max. 
        // Cikla solis ir 2, lai saglabātu laukuma simetriju
        for (let square = squareSizeMin; square <= squareSizeMax; square += 2) {

          // "rādiuss" ap pikseli, kam jāatlasa kaimiņvērtības
          const halfSquareSize = Math.floor(square / 2);
          const squarePixels = [];

          // Savācam apkārt esošo pikseļu vērtības mediānas filtra kvadrāta ietvaros
          for (let j = -halfSquareSize; j <= halfSquareSize; j++) {
            for (let i = -halfSquareSize; i <= halfSquareSize; i++) {
              squarePixels.push(getPixel(data, width, x + i, y + j)[channel])
            }
          }

          // Aprēķina mediānu pašreizējam kvadrātam
          const median = squarePixels.sort((a, b) => a - b)[Math.floor(squarePixels.length / 2)];
          squares.push(median);
        }

        // Piemēro adaptīvo filtru, izvēloties mediānu starp no dažādajām iepriekš iegūtajām starp-mediānām pie dažādiem kvadrātu izmēriem
        const currentSquare = squares.sort((a, b) => a - b)[Math.floor(squares.length / 2)];

        // Piemērojam iegūtu vērtību izvadāmo pikseļu kopai
        resultData[(y * width + x) * 4 + channel] = currentSquare;
      }
    }
  }

  // Izveidojam jaunu ImageData instanci iegūto pikseļu datu glabāšanai
  const outputImageData = new ImageData(new Uint8ClampedArray(resultData), width, height);
  return outputImageData;
};

export default applyAdaptiveMedianFilter;
