// Worker for processing heavy image transformations off the main thread
import resizeImageBilinear from '../transformations/resizing/bilinearResize';
import applyConvolution from '../transformations/convolution/applyConvolution';
import equalizeHistogram from '../transformations/equalizeHistogram/equalizeHistogram';
import decodeImage from '../transformations/predictiveCoding/decode';
import changeHue from '../transformations/changeHue';
import calculateHistogram from '../transformations/equalizeHistogram/calculateHistogram';
import correctColorTemperature from '../transformations/correctColorTemperature';
import applyPaethFilter from '../transformations/predictiveCoding/encode';
import applySobelOperator from '../transformations/edgeDetection/sobel';
import applyLaplaceOperator from '../transformations/edgeDetection/laplace';
import applyAdaptiveMedianFilter from '../transformations/adaptiveFiltering/median';
import applyAdaptiveSusanFilter from '../transformations/adaptiveFiltering/susan';
import { kernels, filters } from '../consts';

const reconstructImageData = (buffer, width, height) => {
  const imageData = new ImageData(width, height);
  imageData.data.set(new Uint8ClampedArray(buffer));
  return imageData;
};

const serializeImageData = imageData => {
  return {
    buffer: imageData.data.buffer,
    width: imageData.width,
    height: imageData.height,
  };
};

self.onmessage = event => {
  try {
    const {
      buffer,
      width,
      height,
      transformationType,
      parameters = {},
    } = event.data;

    const sourceImageData = reconstructImageData(buffer, width, height);
    let outputImageData = null;
    let resultHistogram = null;

    switch (transformationType) {
      case filters.bilinearResize: {
        const resizeCoef = 4;
        const newWidth = width * resizeCoef;
        const newHeight = height * resizeCoef;
        outputImageData = resizeImageBilinear(
          sourceImageData,
          newWidth,
          newHeight
        );
        resultHistogram = calculateHistogram(outputImageData);

        self.postMessage(
          {
            transformationType,
            buffer: outputImageData.data.buffer,
            width: newWidth,
            height: newHeight,
            histogram: resultHistogram,
          },
          [outputImageData.data.buffer]
        );
        return;
      }

      case filters.blur: {
        const blankOutputImageData = new ImageData(width, height);
        outputImageData = applyConvolution(
          sourceImageData,
          blankOutputImageData,
          kernels.gaussianBlur3x3
        );
        break;
      }

      case filters.histogramEqualization: {
        outputImageData = equalizeHistogram(sourceImageData);
        break;
      }

      case filters.changeHue: {
        const blankOutputImageData = new ImageData(width, height);
        outputImageData = changeHue(
          sourceImageData,
          blankOutputImageData,
          parameters.hue || 0
        );
        break;
      }

      case filters.correctColorTemperature: {
        outputImageData = correctColorTemperature(sourceImageData);
        break;
      }

      case filters.sobelEdgeDetection: {
        outputImageData = applySobelOperator(sourceImageData);
        break;
      }

      case filters.laplaceEdgeDetection: {
        outputImageData = applyLaplaceOperator(sourceImageData);
        break;
      }

      case filters.adaptiveFilter: {
        const medianSize = parameters.medianSize || 5;
        outputImageData = applyAdaptiveMedianFilter(
          sourceImageData,
          medianSize
        );
        break;
      }

      case filters.adaptiveFilter2: {
        const medianSize = parameters.medianSize || 5;
        outputImageData = applyAdaptiveSusanFilter(sourceImageData, medianSize);
        break;
      }

      case filters.predictiveCompress: {
        const encodedData = applyPaethFilter(sourceImageData);

        const interimImageData = new ImageData(width, height);
        encodedData.forEach((pxValue, i) => {
          interimImageData.data[i] = pxValue;
        });

        outputImageData = decodeImage(
          encodedData,
          new ImageData(width, height)
        );

        resultHistogram = calculateHistogram(outputImageData);
        self.postMessage(
          {
            transformationType,
            buffer: outputImageData.data.buffer,
            width,
            height,
            histogram: resultHistogram,
            interimBuffer: interimImageData.data.buffer,
          },
          [outputImageData.data.buffer, interimImageData.data.buffer]
        );
        return;
      }

      default:
        outputImageData = sourceImageData;
    }

    if (!resultHistogram) {
      resultHistogram = calculateHistogram(outputImageData);
    }

    self.postMessage(
      {
        transformationType,
        buffer: outputImageData.data.buffer,
        width,
        height,
        histogram: resultHistogram,
      },
      [outputImageData.data.buffer]
    );
  } catch (error) {
    self.postMessage({
      error: error.message,
      stack: error.stack,
    });
  }
};
