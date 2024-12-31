// Konvertē HSI vērtības uz RGB modeli
const hsiToRgb = (h, s, i) => {
  // Nodrošina valīdas vērtības, lai neiet ārā "no rāmjiem"
  h = ((h % 360) + 360) % 360; // transformē hue vērtības uz 0 - 360 diapazonu
  s = Math.min(100, Math.max(0, s)); // notur piesātinājumu 0 - 100 diapazonā
  i = Math.min(100, Math.max(0, i)); // notur intensitāti 0 - 100 diapazonā

  // Starpvērtības
  const hue = h / 60; // hue pārnests uz diapazonu 0 - 6
  const c = (i / 100) * (s / 100); // chroma vērtība
  const x = c * (1 - Math.abs((hue % 2) - 1));
  const m = i / 100 - c; // intensitāte - chroma
  let r, g, b;

  if (0 <= hue && hue < 1) {
    [r, g, b] = [c, x, 0];
  } else if (1 <= hue && hue < 2) {
    [r, g, b] = [x, c, 0];
  } else if (2 <= hue && hue < 3) {
    [r, g, b] = [0, c, x];
  } else if (3 <= hue && hue < 4) {
    [r, g, b] = [0, x, c];
  } else if (4 <= hue && hue < 5) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  // iegūtās RGB vērtības "pārtulkojam" uz vērtībām diapazonā 0-255
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

export default hsiToRgb;
