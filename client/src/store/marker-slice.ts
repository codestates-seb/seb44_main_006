import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  markerId: null,
};

const markerSlice = createSlice({
  name: 'marker',
  initialState,
  reducers: {
    selectMarker(state, action) {
      if (state.markerId === action.payload) {
        state.markerId = null;
      } else state.markerId = action.payload;
    },
  },
});

export const markerReducer = markerSlice.reducer;
export const markerActions = markerSlice.actions;
