export const filters = {
  none: "None",
  blur: "Gaussian Blur",
  bilinearResize: "Bilinear Resizing (4x)",
  predictiveCompress: "Predictive Compression",
  histogramEqualization: "Equalize Histogram",
  changeHue: "Change Hue",
  correctColorTemperature: "Correct Color Temperature",
  sobelEdgeDetection: "Sobel Edge Detection",
  laplaceEdgeDetection: "Laplace Edge Detection",
  adaptiveFilter: "Median Filter",
  adaptiveFilter2: "Susan Filter (MD3 +)"
};

export const kernels = {
  gaussianBlur3x3: [
    1 / 16,
    2 / 16,
    1 / 16,
    2 / 16,
    4 / 16,
    2 / 16,
    1 / 16,
    2 / 16,
    1 / 16,
  ],
  boxBlur: [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9],
  sharpen: [0, -1, 0, -1, 5, -1, 0, -1, 0],
  sobelX: [-1, 0, 1, -2, 0, 2, -1, 0, 1],
  sobelY: [-1, -2, -1, 0, 0, 0, 1, 2, 1],
  laplace: [0, 1, 0, 1, -4, 1, 0, 1, 0],
};
