import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { filters } from "../../consts";
import { actions } from "../../store";
import { imageTransformations } from "./labels";
import HueSlider from "../HueSlider";
import NumberInput from "../NumberInput";
import * as styles from "./styles.module.scss";
import cn from "classnames";

// komponente filtra pogu renderēšanai
const FilterButtons = () => {
  const dispatch = useDispatch();
  const { activeFilter } = useSelector((state) => state.filters);
  const [hoveredFilter, setHoveredFilter] = useState(null);

  const handleFilterClick = (filter) => {
    dispatch(actions.changeFilter(filter));
  };

  const getFilterKey = (filter) => {
    const keyMap = {
      "None": "none",
      "Gaussian Blur": "gaussianBlur",
      "Bilinear Resizing (4x)": "bilinearResizing",
      "Predictive Compression": "predictiveCompression",
      "Equalize Histogram": "equalizeHistogram",
      "Change Hue": "changeHue",
      "Correct Color Temperature": "correctColorTemperature",
      "Sobel Edge Detection": "sobelEdgeDetection",
      "Laplace Edge Detection": "laplaceEdgeDetection",
      "Median Filter": "medianFilter",
      "Susan Filter (MD3 +)": "susanFilter"
    };
    return keyMap[filter] || filter;
  };

  return (
    <div className={styles.buttonContainer}>
      <h2 className={styles.heading}>Choose transformation</h2>
      {Object.values(filters).map((filter) => {
        const filterKey = getFilterKey(filter);
        const label = imageTransformations[filterKey];
        const isActive = activeFilter === filter;
        const isHovered = hoveredFilter === filter;
        const shouldShowDescription = isActive || isHovered;

        return (
          <div key={filter} className={styles.filterItem}>
            <button
              className={cn(
                styles.button,
                isActive ? styles.buttonActive : ""
              )}
              onMouseEnter={() => setHoveredFilter(filter)}
              onMouseLeave={() => setHoveredFilter(null)}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </button>
            {label && (
              <div
                className={cn(
                  styles.description,
                  shouldShowDescription ? styles.visible : styles.hidden
                )}
              >
                {label.description}
              </div>
            )}
            <div
              className={cn(
                styles.extraTools,
                isActive ? styles.visible : styles.hidden
              )}
            >
              {filter === filters.changeHue && <HueSlider />}
              {filter === filters.adaptiveFilter && <NumberInput />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FilterButtons;
