/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TScheduleList, IScheduleListItem } from '../types/type';

interface IInitial {
  list: TScheduleList;
}

const initialState: IInitial = {
  list: [],
};

const scheduleListSlice = createSlice({
  name: 'scheduleList',
  initialState,
  reducers: {
    addList(state, action: PayloadAction<IScheduleListItem>) {
      state.list.push(action.payload);
    },
    resetList(state) {
      state.list = [];
    },
  },
});

export const scheduleListReducer = scheduleListSlice.reducer;
export const scheduleListActions = scheduleListSlice.actions;
