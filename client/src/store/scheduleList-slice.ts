/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TScheduleList, IScheduleListItem } from '../types/type';

interface IInitial {
  list: TScheduleList;
  lastItem: IScheduleListItem;
}

const initialState: IInitial = {
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
    resetList(state) {
      state.list = [];
    },
  },
});

export const scheduleListReducer = scheduleListSlice.reducer;
export const scheduleListActions = scheduleListSlice.actions;
