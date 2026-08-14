import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";

const MedianInput = () => {
  const dispatch = useDispatch();
  const { medianSize } = useSelector((state) => state.filters);

  const clampMedianSize = (value) => {
    const nextValue = Number.isFinite(value) ? value : 3;
    return Math.min(10, Math.max(3, nextValue));
  };

  const changeMedianSize = (nextValue) => {
    dispatch(actions.changeMedianSize(clampMedianSize(nextValue)));
  };

  const updateMedianSize = (e) => {
    changeMedianSize(parseInt(e.target.value, 10));
  };

  const adjustMedianSize = (delta) => {
    changeMedianSize((medianSize || 3) + delta);
  };

  return (
    <div className="w-full">
      <h2 className="mb-2 text-sm text-white/40">Median size:</h2>
      <div className="flex items-center overflow-hidden rounded-md bg-[#111827]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <button
          type="button"
          aria-label="Decrease median size"
          onClick={() => adjustMedianSize(-1)}
          className="flex h-11 w-11 items-center justify-center bg-[#1f2937] text-xl font-semibold text-[#f797cf] transition-colors hover:bg-[#2b3747] hover:text-white"
        >
          −
        </button>

        <input
          type="number"
          min="3"
          max="10"
          value={medianSize}
          onChange={updateMedianSize}
          aria-label="Median size"
          className="w-full border-0 bg-transparent px-3 py-2 text-center text-base font-medium text-white outline-none [appearance:textfield] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          type="button"
          aria-label="Increase median size"
          onClick={() => adjustMedianSize(1)}
          className="flex h-11 w-11 items-center justify-center bg-[#1f2937] text-xl font-semibold text-[#f797cf] transition-colors hover:bg-[#2b3747] hover:text-white"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default MedianInput;
