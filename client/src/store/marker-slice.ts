/* eslint-disable no-param-reassign */
import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IdT, MarkerT } from '../types/type';

const initialState: MarkerT = {
  markerId: undefined,
};

const markerSlice = createSlice({
  name: 'marker',
  initialState,
  reducers: {
    selectMarker(state: Draft<MarkerT>, action: PayloadAction<IdT>) {
      if (state.markerId === action.payload) {
        state.markerId = undefined;
      } else state.markerId = action.payload;
    },
  },
});

export const markerReducer = markerSlice.reducer;
export const markerActions = markerSlice.actions;
