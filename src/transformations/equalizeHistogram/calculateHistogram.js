const calculateHistogram = (imageData) => {
  const histogram = new Array(256).fill(0);
  const pixels = imageData.data;

  // no RGB vērtībām izsakām katra pikseļa intensitāti
  for (let i = 0; i < pixels.length; i += 4) {
    const intensity = Math.round(
      (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3
    );

    // cikliski palielinām histogrammas vertību pie aprēķinātās intensitātes indeksa
    histogram[intensity]++;
  }

  return histogram;
};

export default calculateHistogram;
