/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PlacesSearchResult } from '../types/type';

interface IInitial {
  isEmpty: boolean;
  list: PlacesSearchResult;
}

const initialState: IInitial = {
  isEmpty: false,
  list: [],
};

const placeListSlice = createSlice({
  name: 'placeList',
  initialState,
  reducers: {
    addList(state, action: PayloadAction<PlacesSearchResult>) {
      state.list = action.payload;
    },
    resetList(state) {
      state.list = [];
    },
    setIsEmpty(state, action: PayloadAction<boolean>) {
      state.isEmpty = action.payload;
    },
  },
});

export const placeListReducer = placeListSlice.reducer;
export const placeListActions = placeListSlice.actions;
