// Funkcija, kas nomaina kāda konkrēta pikseļa RGBA vērtības attēlā
// x - pikseļa rindas indekss
// y - pikseļa kolonnas indekss
// imagePixelData - attēla visu pikseļu dati (masīvs)
// imageWidth - attēla platums, kas nepieciešams pikseļa atrašanai pēc rindas & kolonnas indeksiem
// pixelToApply - "jaunā" pikseļa vērtībā, ar kuru aizstāt oriģinālo (masīvs ar [R, G, B, A] vērtībām)

const setPixel = (imagePixelData, imageWidth, x, y, pixelToApply) => {
  const index = (y * imageWidth + x) * 4; // 4 atbilst RGBA kanālu skaitam

  imagePixelData[index] = pixelToApply[0]; // R
  imagePixelData[index + 1] = pixelToApply[1]; // G
  imagePixelData[index + 2] = pixelToApply[2]; // B
  imagePixelData[index + 3] = pixelToApply[3]; // A
};

export default setPixel;
