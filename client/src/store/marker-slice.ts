import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit';

import { MarkerT } from '../types/type';

const initialState: MarkerT = {
  markerId: null,
};

const markerSlice = createSlice({
  name: 'marker',
  initialState,
  reducers: {
    selectMarker(state: Draft<MarkerT>, action: PayloadAction<number | null>) {
      if (state.markerId === action.payload) {
        state.markerId = null;
      } else state.markerId = action.payload;
    },
  },
});

export const markerReducer = markerSlice.reducer;
export const markerActions = markerSlice.actions;
