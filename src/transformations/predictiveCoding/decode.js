import clamp from '../_helpers/clampPixelValue';
import getPixel from "../_helpers/getPixel";
import setPixel from "../_helpers/setPixel";
import paethPredictor from "./paethPredictor";

// funkcija, kas atkodē attēlu pēc tam, kad tas bijis saspiests ar `./encode.js` funkciju
const inversePaethFilter = (encodedData, blankImageData) => {
  const width = blankImageData.width;
  const height = blankImageData.height;
  const decodedData = new ImageData(width, height);

  // ejam cauri rindām un kolonnām
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {

      // izmantojam Paeth Predictor pareģoto vērtību iegūšanai
      const [predictedRed, predictedGreen, predictedBlue] = paethPredictor(
        decodedData.data,
        width,
        x,
        y
      );

      // atrodam kodētās RGB vērtības šinī rindā, kolonnā kodētajā attēlā
      const [encodedRed, encodedGreen, encodedBlue] = getPixel(
        encodedData,
        width,
        x,
        y
      );

      // atkodējot veicam saskaitīšanu, pretēji kodēšanas funkcijai
      // ar "clamp" helper funkciju neļaujam vērtībām pārsniegt 0 - 255 robežas
      const decodedRed = clamp(encodedRed + predictedRed);
      const decodedGreen = clamp(encodedGreen + predictedGreen);
      const decodedBlue = clamp(encodedBlue + predictedBlue);

      // piemērojam aprēķinātās vērtības gala attēlam dotajā rindā, kolonnā
      // A kanāla vērtība paliek nemainīgi 255, pieņemot, ka strādājam ar necaurspīdīgiem attēliem
      setPixel(decodedData.data, decodedData.width, x, y, [
        decodedRed,
        decodedGreen,
        decodedBlue,
        255,
      ]);
    }
  }

  return decodedData;
}

export default inversePaethFilter;
