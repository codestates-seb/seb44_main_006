/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IInitial {
  map: any;
}

const initialState: IInitial = {
  map: {},
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMap(state, action: PayloadAction<any>) {
      state.map = action.payload;
    },
  },
});

export const mapReducer = mapSlice.reducer;
export const mapActions = mapSlice.actions;
