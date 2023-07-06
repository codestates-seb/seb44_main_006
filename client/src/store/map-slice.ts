/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import mapInitialState from '../utils/constant/mapInitialState';

interface IInitial {
  map: kakao.maps.Map;
}

const initialState: IInitial = {
  map: mapInitialState,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMap(state, action: PayloadAction<kakao.maps.Map>) {
      state.map = action.payload;
    },
  },
});

export const mapReducer = mapSlice.reducer;
export const mapActions = mapSlice.actions;
