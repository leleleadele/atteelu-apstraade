import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { actions } from '../../store';
import CornerTag from '../CornerTag';
import Spinner from '../Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { filters } from '../../consts';
import calculateHistogram from '../../transformations/equalizeHistogram/calculateHistogram';

// komponente, kas renderē divus <canvas> elementus:
// vienu, kas satur oriģinālo attēlu bez modifikācijām;
// otru, kuru modificē pēc izvēlētā filtra/transformācijas
const ImageSplit = () => {
  const dispatch = useDispatch();
  const originalImageCanvasRef = useRef(null);
  const interimImageCanvasRef = useRef(null);
  const resultImageCanvasRef = useRef(null);
  const workerRef = useRef(null);

  const [shouldRenderInGreyscale, setShouldRenderInGreyscale] = useState(false);
  const [isLoadingOriginal, setIsLoadingOriginal] = useState(false);
  const [isLoadingResult, setIsLoadingResult] = useState(false);
  const { activeFilter, imageURL, hue, medianSize } = useSelector(
    state => state.filters
  );

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../../workers/imageProcessingWorker.js', import.meta.url),
      { type: 'module' }
    );

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const renderOriginalImage = (image, ref) => {
    const canvas = ref.current;
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height);

    return calculateHistogram(
      context.getImageData(0, 0, image.width, image.height)
    );
  };

  const processImageWithWorker = (image, transformationType) => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current) {
        reject(new Error('Worker not initialized'));
        return;
      }

      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, image.width, image.height);

      const sourceImageData = context.getImageData(
        0,
        0,
        image.width,
        image.height
      );

      const handleMessage = event => {
        workerRef.current.removeEventListener('message', handleMessage);
        workerRef.current.removeEventListener('error', handleError);
        resolve(event.data);
      };

      const handleError = error => {
        workerRef.current.removeEventListener('message', handleMessage);
        workerRef.current.removeEventListener('error', handleError);
        reject(error);
      };

      workerRef.current.addEventListener('message', handleMessage);
      workerRef.current.addEventListener('error', handleError);

      workerRef.current.postMessage(
        {
          buffer: sourceImageData.data.buffer,
          width: image.width,
          height: image.height,
          transformationType,
          parameters: {
            hue,
            medianSize,
          },
        },
        [sourceImageData.data.buffer]
      );
    });
  };

  useEffect(() => {
    const image = new Image();
    let originalHistogram;

    setIsLoadingOriginal(true);
    setIsLoadingResult(true);

    image.onload = async () => {
      try {
        originalHistogram = renderOriginalImage(image, originalImageCanvasRef);
        setIsLoadingOriginal(false);

        if (activeFilter === filters.none) {
          const resultHistogram = renderOriginalImage(
            image,
            resultImageCanvasRef
          );
          dispatch(actions.updateOriginalHistogram(originalHistogram));
          dispatch(actions.updateResultHistogram(resultHistogram));
          setShouldRenderInGreyscale(false);
          setIsLoadingResult(false);
        } else {
          const isGreyscale = activeFilter === filters.histogramEqualization;
          setShouldRenderInGreyscale(isGreyscale);

          const result = await processImageWithWorker(image, activeFilter);

          if (result.error) {
            console.error('Worker error:', result.error);
            setIsLoadingResult(false);
            return;
          }

          const outputImageData = new ImageData(
            new Uint8ClampedArray(result.buffer),
            result.width,
            result.height
          );

          if (
            activeFilter === filters.predictiveCompress &&
            result.interimBuffer
          ) {
            const interimImageData = new ImageData(
              new Uint8ClampedArray(result.interimBuffer),
              result.width,
              result.height
            );

            if (interimImageCanvasRef.current) {
              const interimCanvas = interimImageCanvasRef.current;
              interimCanvas.width = result.width;
              interimCanvas.height = result.height;
              interimCanvas
                .getContext('2d')
                .putImageData(interimImageData, 0, 0);
            }
          }

          const resultCanvas = resultImageCanvasRef.current;
          resultCanvas.width = result.width;
          resultCanvas.height = result.height;
          resultCanvas.getContext('2d').putImageData(outputImageData, 0, 0);

          dispatch(actions.updateOriginalHistogram(originalHistogram));
          dispatch(actions.updateResultHistogram(result.histogram));
          setIsLoadingResult(false);
        }
      } catch (error) {
        console.error('Error processing image:', error);
        setIsLoadingResult(false);
      }
    };

    image.src = imageURL;
  }, [imageURL, activeFilter, hue, medianSize, dispatch]);

  return (
    <div className="grid w-full flex-1 grid-flow-col">
      <div className="relative flex flex-1 flex-col items-center justify-center border-r border-mauve-700 p-8">
        <CornerTag label="Original" />
        <div
          className={cn(
            'relative flex items-center justify-center rounded shadow-2xl',
            shouldRenderInGreyscale && 'grayscale'
          )}
        >
          {isLoadingOriginal && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner />
            </div>
          )}
          <canvas ref={originalImageCanvasRef} />
        </div>
      </div>

      {activeFilter === filters.predictiveCompress && (
        <div className="relative flex flex-1 flex-col items-center justify-center border-r border-mauve-700 p-8">
          <CornerTag label="Interim" />
          <div className="relative flex items-center justify-center rounded shadow-2xl">
            {isLoadingResult && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner />
              </div>
            )}
            <canvas ref={interimImageCanvasRef} />
          </div>
        </div>
      )}

      <div className="relative flex flex-1 flex-col items-center justify-center p-8">
        <CornerTag label="Result" />
        <div className="relative flex items-center justify-center rounded shadow-2xl">
          {isLoadingResult && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner />
            </div>
          )}
          <canvas ref={resultImageCanvasRef} />
        </div>
      </div>
    </div>
  );
};

export default ImageSplit;
