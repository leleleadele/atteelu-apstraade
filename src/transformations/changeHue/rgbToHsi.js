// Konvertē RGB vērtības uz HSI
const rgbToHsi = (r, g, b) => {
  // pārtaisām RGB vērtības koeficientos diapazonā 0 - 1
  r = r / 255;
  g = g / 255;
  b = b / 255;

  const intensity = Math.max(r, g, b);
  const saturation = intensity === 0 ? 0 : 1 - Math.min(r, g, b) / intensity;
  let hue;

  if (saturation === 0) {
    hue = 0;
  } else {
    hue =
      (0.5 * (r - g + (r - b))) / Math.sqrt((r - g) ** 2 + (r - b) * (g - b));
    hue = Math.acos(hue);
    hue = b > g ? 2 * Math.PI - hue : hue;
    hue = hue * (180 / Math.PI);
  }

  return [hue, saturation * 100, intensity * 100];
}

export default rgbToHsi;
