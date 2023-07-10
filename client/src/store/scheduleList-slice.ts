/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TScheduleList, IScheduleListItem } from '../types/type';

interface IInitial {
  imageUrl: string;
  title: string;
  description: string;
  list: TScheduleList;
  lastItem: IScheduleListItem;
}

const initialState: IInitial = {
  imageUrl: '',
  title: '',
  description: '',
  list: [],
  lastItem: {
    placeName: '',
    placeUrl: '',
    roadAddressName: '',
    id: '',
    phone: '',
    categoryGroupCode: undefined,
    categoryGroupName: '',
    x: '',
    y: '',
  },
};

const scheduleListSlice = createSlice({
  name: 'scheduleList',
  initialState,
  reducers: {
    addList(state, action: PayloadAction<IScheduleListItem>) {
      state.list.push(action.payload);
      state.lastItem = action.payload;
    },
    addImage(state, action: PayloadAction<string>) {
      state.imageUrl = action.payload;
    },
    addTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    addDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    resetList(state) {
      state.list = [];
      state.imageUrl = '';
      state.title = '';
      state.description = '';
      state.lastItem = {
        placeName: '',
        placeUrl: '',
        roadAddressName: '',
        id: '',
        phone: '',
        categoryGroupCode: undefined,
        categoryGroupName: '',
        x: '',
        y: '',
      };
    },
  },
});

export const scheduleListReducer = scheduleListSlice.reducer;
export const scheduleListActions = scheduleListSlice.actions;
