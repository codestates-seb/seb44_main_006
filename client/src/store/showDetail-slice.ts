/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PlacesSearchResultItem } from '../types/type';
import scheduleDetailState from '../utils/constant/scheduleDetailState';

interface IInitial {
  isShow: boolean;
  item: PlacesSearchResultItem;
}

const initialState: IInitial = {
  isShow: false,
  item: scheduleDetailState,
};

const showDetailSlice = createSlice({
  name: 'showDetail',
  initialState,
  reducers: {
    setIsShow(state, action: PayloadAction<boolean>) {
      state.isShow = action.payload;
    },
    setItem(state, action: PayloadAction<PlacesSearchResultItem>) {
      state.item = action.payload;
    },
  },
});

export const showDetailReducer = showDetailSlice.reducer;
export const showDetailActions = showDetailSlice.actions;
