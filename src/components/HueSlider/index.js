import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../store';
import * as styles from "./styles.module.scss";

const HueSlider = () => {
const dispatch = useDispatch();
  const { hue } = useSelector((state) => state.filters);

  const updateHue = (e) => {
    dispatch(actions.changeHue(parseInt(e.target.value)))
  };

  return (
    <div className={styles.container}>
      <h2>Hue:</h2>
      <input
        type="range"
        min="0"
        max="360"
        value={hue}
        onChange={updateHue}
        className={styles.slider}
      />
    </div>
  );
};

export default HueSlider;
