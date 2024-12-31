import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../store';
import * as styles from "./styles.module.scss";

const NumberInput = () => {
const dispatch = useDispatch();
  const { medianSize } = useSelector((state) => state.filters);

  const updateMedianSize = (e) => {
    dispatch(actions.changeMedianSize(parseInt(e.target.value)))
  };

  return (
    <div className={styles.container}>
      <h2>Median size:</h2>
      <input
        type="number"
        min="3"
        max="10"
        value={medianSize}
        onChange={updateMedianSize}
        className={styles.input}
      />
    </div>
  );
};

export default NumberInput;
