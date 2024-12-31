// no MD1
import setPixel from "../_helpers/setPixel";
import getPixel from "../_helpers/getPixel";
import interpolate from "../_helpers/interpolate";

// sourceImageData - oriģinālā attēla dati
// newWidth, newHeigt - iegūstamā attēla izmēri

const resizeImageBilinear = (sourceImageData, newWidth, newHeight) => {
  // oriģinālā attēla parametri
  const oldWidth = sourceImageData.width;
  const oldHeight = sourceImageData.height;

  // rada jaunu <canvas> kontekstu rezultējošajam attēlam
  const resizedCanvas = document.createElement("canvas");
  resizedCanvas.width = newWidth;
  resizedCanvas.height = newHeight;
  const resizedCtx = resizedCanvas.getContext("2d");
  const resizedImage = resizedCtx.getImageData(0, 0, newWidth, newHeight);

  // skalēšanas faktora aprēķins
  const widthScale = oldWidth / newWidth;
  const heightScale = oldHeight / newHeight;

  // cikliski iet cauri katram gala attēla pikselim
  // y = pikseļa rindas indekss
  // x = pikseļa kolonnas indekss
  for (let y = 0; y < newHeight; y++) {
    for (let x = 0; x < newWidth; x++) {
      // atrod "atbilstošā" pikseļa teorētisko atrašanās vietu oriģinālajā attēlā
      const srcX = x * widthScale;
      const srcY = y * heightScale;

      // atrod četrus reālos tuvākos pikseļus oriģinālajā attēlā
      const x1 = Math.floor(srcX);
      const x2 = Math.min(x1 + 1, sourceImageData.width - 1);
      const y1 = Math.floor(srcY);
      const y2 = Math.min(y1 + 1, sourceImageData.height - 1);

      // interpolācijai nepieciešamo fraktāļu aprēķins
      const alpha = srcX - x1;
      const beta = srcY - y1;

      // iegūst RGBA vērtības šiem četriem tuvākajiem pikseļiem
      const topLeft = getPixel(
        sourceImageData.data,
        sourceImageData.width,
        x1,
        y1
      );
      const topRight = getPixel(
        sourceImageData.data,
        sourceImageData.width,
        x2,
        y1
      );
      const bottomLeft = getPixel(
        sourceImageData.data,
        sourceImageData.width,
        x1,
        y2
      );
      const bottomRight = getPixel(
        sourceImageData.data,
        sourceImageData.width,
        x2,
        y2
      );

      // veic bilineāro interpolāciju ar katru RGBA kanālu
      const interpolatedPixel = [
        interpolate(
          topLeft[0],
          topRight[0],
          bottomLeft[0],
          bottomRight[0],
          alpha,
          beta
        ),
        interpolate(
          topLeft[1],
          topRight[1],
          bottomLeft[1],
          bottomRight[1],
          alpha,
          beta
        ),
        interpolate(
          topLeft[2],
          topRight[2],
          bottomLeft[2],
          bottomRight[2],
          alpha,
          beta
        ),
        interpolate(
          topLeft[3],
          topRight[3],
          bottomLeft[3],
          bottomRight[3],
          alpha,
          beta
        ),
      ];

      // ievieto aprēķināto pikseli jaunajā, iegūstamajā attēlā
      setPixel(resizedImage.data, resizedImage.width, x, y, interpolatedPixel);
    }
  }

  return resizedImage;
};

export default resizeImageBilinear;
