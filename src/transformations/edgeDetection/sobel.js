import applyConvolution from "../convolution/applyConvolution";
import { kernels } from "../../consts";

const applySobelOperator = (imageData) => {
  const { sobelX, sobelY } = kernels;

  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;

  // Pārizmantoju to pašu konvolūcijas metodi, ko izmantoju MD1 Gausa izpludināšanas filtram,
  // tikai šoreiz ar sobelX un sobelY "kernel" svaru maskām
  const sobelXOutput = applyConvolution(
    imageData,
    new ImageData(width, height),
    sobelX
  );
  const sobelYOutput = applyConvolution(
    imageData,
    new ImageData(width, height),
    sobelY
  );

  // Ejam cauri visiem attēla RGBA pikseļiem
  for (let i = 0; i < data.length; i += 4) {
    // iegūstam Sobel X un Sobel Y vērtības tekošajam pikselim
    // to veicam pikseļa R, G un B vērtībām
    const sobelXValueR = sobelXOutput.data[i];
    const sobelYValueR = sobelYOutput.data[i];

    const sobelXValueG = sobelXOutput.data[i + 1];
    const sobelYValueG = sobelYOutput.data[i + 1];

    const sobelXValueB = sobelXOutput.data[i + 2];
    const sobelYValueB = sobelYOutput.data[i + 2];

    // Aprēķinām gradienta magnitūdu katram krāsu kanālam
    const magnitudeR = Math.sqrt(sobelXValueR ** 2 + sobelYValueR ** 2);
    const magnitudeG = Math.sqrt(sobelXValueG ** 2 + sobelYValueG ** 2);
    const magnitudeB = Math.sqrt(sobelXValueB ** 2 + sobelYValueB ** 2);

    // Piemērojam iegūtās magnitūdas vērtības pikseļa RGB vērtībām attēlā
    data[i] = magnitudeR; // R
    data[i + 1] = magnitudeG; // G
    data[i + 2] = magnitudeB; // B
    data[i + 3] = data[i + 3]; // Alfa kanāls paliek nemainīgs
  }

  return imageData;
};

export default applySobelOperator;
