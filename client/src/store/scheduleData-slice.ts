/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// import { PostReadT } from '../types/apitype';

type courseDataT = {
  courseContent?: string;
  courseDday?: string;
  courseThumbnail?: string;
  courseTitle?: string;
};

type destinationListT = {
  categoryGroupCode?: string;
  categoryGroupName?: string;
  id?: string;
  phone?: string;
  placeName?: string;
  placeUrl?: string;
  roadAddressName?: string;
  x?: string;
  y?: string;
};

type scheduleDetailT = {
  courseData?: courseDataT[];
  destinationList?: destinationListT[];
}

const initialState: scheduleDetailT = {
  courseData: [
    {
      courseContent: '',
      courseDday: '',
      courseThumbnail: '',
      courseTitle: '',
    },
  ],
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
    getCourseData(state, action: PayloadAction<courseDataT[]>) {
      state.courseData = action.payload;
    },
    getDestinationList(state, action: PayloadAction<destinationListT[]>) {
      state.destinationList = action.payload;
    },
  },
});

export const scheduleDetailReducer = scheduleDetailSlice.reducer;
export const scheduleDetailActions = scheduleDetailSlice.actions;
