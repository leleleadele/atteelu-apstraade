import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { filters } from "../consts.js";

// te notiek lietotnes stāvokļa apstrāde
export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    activeFilter: filters.none,
    imageURL: "sample.jpg",
    hue: 0,
    medianSize: 5,
    originalHistogram: null,
    resultHistogram: null,
  },
  reducers: {
    changeFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    changeImage: (state, action) => {
      state.imageURL = action.payload;
    },
    changeHue: (state, action) => {
      state.hue = action.payload;
    },
    changeMedianSize: (state, action) => {
      state.medianSize = action.payload;
    },
    updateOriginalHistogram: (state, action) => {
      state.originalHistogram = action.payload;
    },
    updateResultHistogram: (state, action) => {
      state.resultHistogram = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
  },
});

export default store;
export const actions = filtersSlice.actions;
