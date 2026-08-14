export const imageTransformations = {
  none: {
    name: "None",
    description: "Displays the raw source image without applying any spatial or color transformation pipelines."
  },
  gaussianBlur: {
    name: "Gaussian Blur",
    description: "Applies a 2D Gaussian function kernel to convolve adjacent pixels, smoothly attenuating high-frequency spatial noise."
  },
  bilinearResizing: {
    name: "Bilinear Resizing (4x)",
    description: "Scales the image dimensions quadruply by calculating linear interpolations across both 2D axes for intermediate pixel values. (Yes, the resulting image is intentionally 4x bigger)"
  },
  predictiveCompression: {
    name: "Predictive Compression",
    description: "Reduces data redundancy by predicting a target pixel's value from its neighbors and encoding only the residual error matrix."
  },
  equalizeHistogram: {
    name: "Equalize Histogram",
    description: "Spreads out the most frequent intensity values using cumulative distribution functions to increase global contrast."
  },
  changeHue: {
    name: "Change Hue",
    description: "Converts pixel color spaces from RGB to HSV to shift the primary hue angle before converting back to display output."
  },
  correctColorTemperature: {
    name: "Correct Color Temperature",
    description: "Adjusts the relative balance of red and blue color channels to simulate warm or cool Kelvin lighting shifts."
  },
  sobelEdgeDetection: {
    name: "Sobel Edge Detection",
    description: "Calculates the directional intensity gradient at each pixel using dual 3x3 convolution kernels to highlight distinct boundaries."
  },
  laplaceEdgeDetection: {
    name: "Laplace Edge Detection",
    description: "Uses a second-derivative isotropic operator to highlight regions of rapid intensity change and zero-crossings."
  },
  medianFilter: {
    name: "Median Filter",
    description: "Replaces each target pixel value with the statistical median of its neighborhood, effective for removing salt-and-pepper noise while preserving edges."
  },
  susanFilter: {
    name: "Susan Filter",
    description: "Uses a circular mask to detect edges and features without gradient derivatives by analyzing univalue segment assimilating nuclei (USAN) areas."
  }
};
