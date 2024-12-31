import getPixel from "../_helpers/getPixel";
import setPixel from "../_helpers/setPixel";
import paethPredictor from "./paethPredictor";

// attēla saspiešana ar paredzēšanas metodi, izmantojot Paeth Predictor
// "encoding" solis attēla saspiešanā
const applyPaethFilter = (imageData) => {
  const width = imageData.width;
  const height = imageData.height;
  const encodedData = [];

  // secīgi ejam cauri attēla pikseļiem pa rindām, kolonnām
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {

      // iegūstam oriģinālās pikseļa RGB vērtības pie dotās rindas, kolonnas
      const [originalRed, originalGreen, originalBlue] = getPixel(
        imageData.data,
        width,
        x,
        y
      );

      // izmantojam Paeth Predictor, lai iegūtu paredzētās RGB px vērtības
      const [predictedRed, predictedGreen, predictedBlue] = paethPredictor(
        imageData.data,
        width,
        x,
        y
      );

      // nokodējot (pretstatā atkodēšanai) veicam atņemšanu
      const encodedRed = (originalRed - predictedRed);
      const encodedGreen = (originalGreen - predictedGreen);
      const encodedBlue = (originalBlue - predictedBlue);

      // aprēķinātās vērtības piemērojam gala (encoded) attēlam pie dotās rindas, kolonnas
      // A kanāla vērtības atstājam 255, pieņemot, ka nestrādājam ar caurspīdīgiem attēliem
      setPixel(encodedData, width, x, y, [
        encodedRed,
        encodedGreen,
        encodedBlue,
        255,
      ]);
    }
  }

  return encodedData;
}

export default applyPaethFilter;
