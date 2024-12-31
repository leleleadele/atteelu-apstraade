import calculateHistogram from "./calculateHistogram";

const equalizeHistogram = (imageData) => {
  const pixels = imageData.data;
  const histogram = calculateHistogram(imageData);

  // iegūstam histogrammas CDF (Cumulative Distribution Function)
  let cumulative = 0;
  const cdf = histogram.map((count) => (cumulative += count));

  // pārnesam/normalizējam CDF uz diapazonu 0 - 255
  const totalPixels = pixels.length / 4;
  const normalizedCdf = cdf.map((value) =>
    Math.round((value / totalPixels) * 255)
  );

  // vienmērogojam attēlu, piemērojot normalizēto CDF katra pikseļa intensitātei
  for (let i = 0; i < pixels.length; i += 4) {
    // intensitāti aprēķinām no RGB vērtību vidējā
    const intensity = Math.round(
      (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3
    );
    const equalizedIntensity = normalizedCdf[intensity];

    // piemērojam jaunās vērtības transformētā attēla datos
    pixels[i] = equalizedIntensity;
    pixels[i + 1] = equalizedIntensity;
    pixels[i + 2] = equalizedIntensity;
  }

  return imageData;
}

export default equalizeHistogram;
