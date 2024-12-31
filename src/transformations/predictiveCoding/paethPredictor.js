import getPixel from "../_helpers/getPixel";

const paethPredictor = (imagePixels, imageWidth, x, y) => {
  // vērtība, ko izmantot pie bildes pašas kreisās un augšējās malas,
  // kad pietrūkst a, b, c references pikseļa
  const placeholderPixel = [255, 255, 255, 255];

  // iegūstam pikseļus [R,G,B,A] formātā
  // kas nepieciešami pēc p = a + b - c formulas
  const a =
    x !== 0 ? getPixel(imagePixels, imageWidth, x - 1, y) : placeholderPixel;
  const b =
    y !== 0 ? getPixel(imagePixels, imageWidth, x, y - 1) : placeholderPixel;
  const c =
    x !== 0 && y !== 0
      ? getPixel(imagePixels, imageWidth, x - 1, y - 1)
      : placeholderPixel;

  // A vērtību hardkodēju kā 255, jo pieņemu,
  // ka neizmantošu puscaurspīdīgu bildi
  const result = [0, 0, 0, 255];

  // bilde nav melnbalta, tāpēc ejam cauri RGB kanāliem.
  // A kanālu ignorēšu, tas lai paliek nemainīts.
  for (let i = 0; i < 3; i++) {
    const p = a[i] + b[i] - c[i];
    const pa = Math.abs(p - a[i]);
    const pb = Math.abs(p - b[i]);
    const pc = Math.abs(p - c[i]);

    if (pa <= pb && pa <= pc) {
      result[i] = a[i];
    } else if (pb <= pc) {
      result[i] = b[i];
    } else {
      result[i] = c[i];
    }
  }

  return result;
}

export default paethPredictor;
