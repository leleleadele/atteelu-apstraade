import styles from "./styles.module.scss";
import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import { actions } from "../../store";
import resizeImageBilinear from "../../transformations/resizing/bilinearResize";
import applyConvolution from "../../transformations/convolution/applyConvolution";
import equalizeHistogram from "../../transformations/equalizeHistogram/equalizeHistogram";
import decodeImage from "../../transformations/predictiveCoding/decode";
import { useDispatch, useSelector } from "react-redux";
import { filters, kernels } from "../../consts";
import changeHue from "../../transformations/changeHue";
import calculateHistogram from "../../transformations/equalizeHistogram/calculateHistogram";
import correctColorTemperature from "../../transformations/correctColorTemperature";
import applyPaethFilter from "../../transformations/predictiveCoding/encode";
import applySobelOperator from "../../transformations/edgeDetection/sobel";
import applyLaplaceOperator from "../../transformations/edgeDetection/laplace";
import applyAdaptiveMedianFilter from "../../transformations/adaptiveFiltering/median";
import applyAdaptiveSusanFilter from '../../transformations/adaptiveFiltering/susan';

// komponente, kas renderē divus <canvas> elementus:
// vienu, kas satur oriģinālo attēlu bez modifikācijām;
// otru, kuru modificē pēc izvēlētā filtra/transformācijas
const ImageSplit = () => {
  const dispatch = useDispatch();
  const originalImageCanvasRef = useRef(null);
  const interimImageCanvasRef = useRef(null);
  const resultImageCanvasRef = useRef(null);

  const [shouldRenderInGreyscale, setShouldRenderInGreyscale] = useState(false);
  const { activeFilter, imageURL, hue, medianSize } = useSelector(
    (state) => state.filters
  );

  const renderOriginalImage = (image, ref) => {
    const canvas = ref.current;
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);

    return calculateHistogram(
      context.getImageData(0, 0, image.width, image.height)
    );
  };

  const renderBilinearImg = (image) => {
    const resizeCoef = 4;
    const newWidth = image.width * resizeCoef;
    const newHeight = image.height * resizeCoef;

    const originalCanvas = originalImageCanvasRef.current;
    const modifiedCanvas = resultImageCanvasRef.current;
    modifiedCanvas.width = newWidth;
    modifiedCanvas.height = newHeight;

    const context = modifiedCanvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);

    const outputImageData = resizeImageBilinear(
      originalCanvas
        .getContext("2d")
        .getImageData(0, 0, image.width, image.height),
      newWidth,
      newHeight
    );

    context.putImageData(outputImageData, 0, 0);

    return calculateHistogram(outputImageData);
  };

  const renderGaussianBlurImg = (image) => {
    const canvas = resultImageCanvasRef.current;
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);

    const sourceImageData = context.getImageData(
      0,
      0,
      image.width,
      image.height
    );

    const blankOutputImageData = context.createImageData(
      image.width,
      image.height
    );

    const outputImageData = applyConvolution(
      sourceImageData,
      blankOutputImageData,
      kernels.gaussianBlur3x3
    );

    context.putImageData(outputImageData, 0, 0);
    return calculateHistogram(outputImageData);
  };

  const renderCompressedImg = (image) => {
    const interimCanvas = interimImageCanvasRef.current;
    interimCanvas.width = image.width;
    interimCanvas.height = image.height;
    const interimContext = interimCanvas.getContext("2d");
    interimContext.drawImage(image, 0, 0, image.width, image.height);

    const finalCanvas = resultImageCanvasRef.current;
    finalCanvas.width = image.width;
    finalCanvas.height = image.height;
    const finalContext = finalCanvas.getContext("2d");
    finalContext.drawImage(image, 0, 0, image.width, image.height);

    const sourceImageData = interimContext.getImageData(
      0,
      0,
      image.width,
      image.height
    );

    const encodedData = applyPaethFilter(sourceImageData);

    const interimImageData = new ImageData(image.width, image.height);
    encodedData.map((pxValue, i) => {
      interimImageData.data[i] = pxValue;
    });

    interimContext.putImageData(interimImageData, 0, 0);

    const finalImageData = decodeImage(
      encodedData,
      finalContext.createImageData(image.width, image.height)
    );

    finalContext.putImageData(finalImageData, 0, 0);

    return calculateHistogram(finalImageData);
  };

  const renderHistogramEqualizationImg = (image) => {
    const canvas = resultImageCanvasRef.current;
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);

    const sourceImageData = context.getImageData(
      0,
      0,
      image.width,
      image.height
    );

    const outputImageData = equalizeHistogram(sourceImageData);

    context.putImageData(outputImageData, 0, 0);

    return calculateHistogram(outputImageData);
  };

  const renderHueChangeImg = (image) => {
    const canvas = resultImageCanvasRef.current;
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);

    const sourceImageData = context.getImageData(
      0,
      0,
      image.width,
      image.height
    );

    const outputImageData = changeHue(
      sourceImageData,
      context.createImageData(image.width, image.height),
      hue
    );

    context.putImageData(outputImageData, 0, 0);

    return calculateHistogram(outputImageData);
  };

  const renderCorrectedColorTempImg = (image) => {
    const canvas = resultImageCanvasRef.current;
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);

    const sourceImageData = context.getImageData(
      0,
      0,
      image.width,
      image.height
    );

    const outputImageData = correctColorTemperature(sourceImageData);

    context.putImageData(outputImageData, 0, 0);

    return calculateHistogram(outputImageData);
  };

  const renderSobelImg = (image) => {
    const canvas = resultImageCanvasRef.current;
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);

    const sourceImageData = context.getImageData(
      0,
      0,
      image.width,
      image.height
    );

    const outputImageData = applySobelOperator(sourceImageData);

    context.putImageData(outputImageData, 0, 0);
    return calculateHistogram(outputImageData);
  };

  const renderLaplaceImg = (image) => {
    const canvas = resultImageCanvasRef.current;
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);

    const sourceImageData = context.getImageData(
      0,
      0,
      image.width,
      image.height
    );

    const outputImageData = applyLaplaceOperator(sourceImageData);

    context.putImageData(outputImageData, 0, 0);
    return calculateHistogram(outputImageData);
  };

  const renderMedianFilterImg = (image) => {
    const canvas = resultImageCanvasRef.current;
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);

    const sourceImageData = context.getImageData(
      0,
      0,
      image.width,
      image.height
    );

    const outputImageData = applyAdaptiveMedianFilter(
      sourceImageData,
      medianSize
    );

    context.putImageData(outputImageData, 0, 0);
    return calculateHistogram(outputImageData);
  };

  const renderSusanFilterImg = (image) => {
    const canvas = resultImageCanvasRef.current;
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);

    const sourceImageData = context.getImageData(
      0,
      0,
      image.width,
      image.height
    );

    const outputImageData = applyAdaptiveSusanFilter(
      sourceImageData,
      medianSize
    );

    context.putImageData(outputImageData, 0, 0);
    return calculateHistogram(outputImageData);
  };

  useEffect(() => {
    const image = new Image();
    let originalHistogram;
    let resultHistogram;

    image.onload = () => {
      originalHistogram = renderOriginalImage(image, originalImageCanvasRef);

      switch (activeFilter) {
        case filters.bilinearResize:
          setShouldRenderInGreyscale(false);
          resultHistogram = renderBilinearImg(image);
          break;

        case filters.predictiveCompress:
          setShouldRenderInGreyscale(false);
          resultHistogram = renderCompressedImg(image);
          break;

        case filters.blur:
          setShouldRenderInGreyscale(false);
          resultHistogram = renderGaussianBlurImg(image);
          break;

        case filters.histogramEqualization:
          setShouldRenderInGreyscale(true);
          resultHistogram = renderHistogramEqualizationImg(image);
          break;

        case filters.changeHue:
          setShouldRenderInGreyscale(false);
          resultHistogram = renderHueChangeImg(image);
          break;

        case filters.correctColorTemperature:
          setShouldRenderInGreyscale(false);
          resultHistogram = renderCorrectedColorTempImg(image);
          break;

        case filters.sobelEdgeDetection:
          setShouldRenderInGreyscale(false);
          resultHistogram = renderSobelImg(image);
          break;

        case filters.laplaceEdgeDetection:
          setShouldRenderInGreyscale(false);
          resultHistogram = renderLaplaceImg(image);
          break;

        case filters.adaptiveFilter:
          setShouldRenderInGreyscale(false);
          resultHistogram = renderMedianFilterImg(image);
          break;

        case filters.adaptiveFilter2:
          setShouldRenderInGreyscale(false);
          resultHistogram = renderSusanFilterImg(image);
          break;

        default:
          setShouldRenderInGreyscale(false);
          resultHistogram = renderOriginalImage(image, resultImageCanvasRef);
          break;
      }

      dispatch(actions.updateOriginalHistogram(originalHistogram));
      dispatch(actions.updateResultHistogram(resultHistogram));
    };

    image.src = imageURL;
  }, [imageURL, activeFilter, hue, medianSize]);

  return (
    <div className={styles.imageSplit}>
      <div className={styles.section}>
        <h2>Original:</h2>
        <div
          className={cn(
            styles.image,
            shouldRenderInGreyscale && styles.greyscale
          )}
        >
          <canvas ref={originalImageCanvasRef} />
        </div>
      </div>

      {activeFilter === filters.predictiveCompress && (
        <div className={styles.section}>
          <h2>Interim:</h2>
          <div className={styles.image}>
            <canvas ref={interimImageCanvasRef} />
          </div>
        </div>
      )}

      <div className={styles.section}>
        <h2>Result:</h2>
        <div className={styles.image}>
          <canvas ref={resultImageCanvasRef} />
        </div>
      </div>
    </div>
  );
};

export default ImageSplit;
