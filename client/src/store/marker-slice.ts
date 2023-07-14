/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IdT } from '../types/type';

const initialState: IdT = {
  markerId: '',
  center: { lat: '', lng: '' },
  scroll: null,
};

const markerSlice = createSlice({
  name: 'marker',
  initialState,
  reducers: {
    selectMarker(state, action: PayloadAction<IdT>) {
      if (state.markerId === action.payload.markerId) {
        state.markerId = '';
        state.scroll = null;
      } else {
        state.markerId = action.payload.markerId;
        state.center = action.payload.center;
      }
    },
    setscroll(state, action: PayloadAction<null | number>) {
      state.scroll = action.payload;
    },
  },
});

export const markerReducer = markerSlice.reducer;
export const markerActions = markerSlice.actions;
