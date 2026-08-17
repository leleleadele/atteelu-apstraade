import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { filters } from '../../consts';
import { actions } from '../../store';
import { imageTransformations } from './labels';
import HueSlider from '../HueSlider';
import MedianInput from '../MedianInput';
import cn from 'classnames';

// komponente filtra pogu renderēšanai
const FilterButtons = () => {
  const dispatch = useDispatch();
  const { activeFilter } = useSelector(state => state.filters);
  const [hoveredFilter, setHoveredFilter] = useState(null);

  const handleFilterClick = filter => {
    dispatch(actions.changeFilter(filter));
  };

  const getFilterKey = filter => {
    const keyMap = {
      None: 'none',
      'Gaussian Blur': 'gaussianBlur',
      'Bilinear Resizing (4x)': 'bilinearResizing',
      'Predictive Compression': 'predictiveCompression',
      'Equalize Histogram': 'equalizeHistogram',
      'Change Hue': 'changeHue',
      'Correct Color Temperature': 'correctColorTemperature',
      'Sobel Edge Detection': 'sobelEdgeDetection',
      'Laplace Edge Detection': 'laplaceEdgeDetection',
      'Median Filter': 'medianFilter',
      'Susan Filter': 'susanFilter',
    };
    return keyMap[filter] || filter;
  };

  return (
    <div className="flex flex-col items-start">
      <h2 className="mb-4 font-mono text-white uppercase opacity-30">
        Choose transformation
      </h2>
      {Object.values(filters).map(filter => {
        const filterKey = getFilterKey(filter);
        const label = imageTransformations[filterKey];
        const isActive = activeFilter === filter;
        const isHovered = hoveredFilter === filter;
        const shouldShowDescription = isActive;

        return (
          <div
            key={filter}
            className="w-full"
            onClick={() => handleFilterClick(filter)}
            onMouseEnter={() => setHoveredFilter(filter)}
            onMouseLeave={() => setHoveredFilter(null)}
          >
            <button
              className={cn(
                'py-2 text-base transition-colors duration-500 ease-in-out focus-within:text-white hover:text-white focus:text-white focus-visible:text-white active:text-white',
                isActive ? 'text-white' : 'text-pink-300'
              )}
            >
              {filter}
            </button>
            {label && (
              <div
                className={cn(
                  'mt-1 mb-2 text-sm transition-opacity duration-500 ease-in-out',
                  shouldShowDescription
                    ? 'visible h-auto opacity-100!'
                    : 'pointer-events-none m-0! h-0! opacity-0'
                )}
              >
                {label.description}
              </div>
            )}
            <div
              className={cn(
                'w-full overflow-hidden transition-opacity duration-500 ease-in-out',
                isActive
                  ? 'pointer-events-auto mb-auto h-auto px-0 py-2 opacity-100'
                  : 'pointer-events-none m-0 h-0 p-0 opacity-0'
              )}
            >
              {filter === filters.changeHue && <HueSlider />}
              {filter === filters.adaptiveFilter && <MedianInput />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FilterButtons;
