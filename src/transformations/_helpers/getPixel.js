// atrod pikseli attēlā (tā RGBA vērtības izteiktas masīvā) pēc rindas un kolonnas indeksiem
// 4 atbilst RGBA kanālu skaitam
const getPixel = (imagePixelData, imageWidth, x, y) => {
  const index = (y * imageWidth + x) * 4;
  return [
    imagePixelData[index], // R
    imagePixelData[index + 1], // G
    imagePixelData[index + 2], // B
    imagePixelData[index + 3], // A
  ];
};

export default getPixel;
