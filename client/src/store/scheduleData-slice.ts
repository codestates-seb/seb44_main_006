/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IScheduleListItem } from '../types/type';
import { PostReadT } from '../types/apitype';

const initialState: PostReadT = {
  courseData: {
    courseContent: '',
    courseDday: '',
    courseThumbnail: '',
    courseTitle: '',
  },
  destinationList: [
    {
      categoryGroupCode: '',
      categoryGroupName: '',
      id: '',
      phone: '',
      placeName: '',
      placeUrl: '',
      roadAddressName: '',
      x: '',
      y: '',
    },
  ],
};

const scheduleDetailSlice = createSlice({
  name: 'scheduleDetail',
  initialState,
  reducers: {
    getCourseData(state, action: PayloadAction<PostReadT['courseData']>) {
      state.courseData = action.payload;
    },
    getDestinationList(state, action: PayloadAction<IScheduleListItem[]>) {
      state.destinationList = action.payload;
    },
  },
});

export const scheduleDetailReducer = scheduleDetailSlice.reducer;
export const scheduleDetailActions = scheduleDetailSlice.actions;
