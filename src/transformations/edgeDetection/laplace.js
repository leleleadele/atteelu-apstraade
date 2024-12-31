import applyConvolution from "../convolution/applyConvolution";
import { kernels } from "../../consts";

const applyLaplaceOperator = (imageData) => {
  const laplaceKernel = kernels.laplace;

  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;

  // Pārizmantoju to pašu konvolūcijas metodi, ko izmantoju MD1 Gausa izpludināšanas filtram,
  // tikai šoreiz ar Laplasa "kernel" svaru masku
  const laplaceOutput = applyConvolution(
    imageData,
    new ImageData(width, height),
    laplaceKernel
  );

  for (let i = 0; i < data.length; i += 4) {
    // Piemērojam Laplasa vērtības katram fināla R, G, B kanālam attēlā
    data[i] = laplaceOutput.data[i]; // R
    data[i + 1] = laplaceOutput.data[i + 1]; // G
    data[i + 2] = laplaceOutput.data[i + 2]; // B
    data[i + 3] = data[i + 3]; // Alfa kanāls paliek nemainīgs
  }

  return imageData;
};

export default applyLaplaceOperator;
