/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ILatLng, IdT } from '../types/type';

const initialState: IdT = {
  markerId: '',
  center: { lat: '', lng: '' },
  scroll: null,
  firstCourse: { lat: '', lng: '', level: 6 },
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
    setInitialCenter(state, action: PayloadAction<ILatLng>) {
      state.firstCourse = action.payload;
    },
    reset(state) {
      state.markerId = '';
      state.center = { lat: '', lng: '' };
      state.scroll = null;
      state.firstCourse = { lat: '', lng: '', level: 6 };
    },
  },
});

export const markerReducer = markerSlice.reducer;
export const markerActions = markerSlice.actions;
