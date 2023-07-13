/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  MypCourseSummaryT,
  MyBookMarkSummaryT,
  MypSummaryT,
} from '../types/apitype';

const initialState: MypSummaryT = {
  memberCourseList: [
    {
      courseContent: '',
      courseDday: '',
      courseId: -1,
      courseLikeCount: 0,
      courseThumbnail: '',
      courseTitle: '',
      courseUpdatedAt: '',
      courseViewCount: 0,
      isPosted: false,
      memberNickname: '',
    },
  ],
  memberBookmarkedList: [
    {
      courseId: -1,
      courseLikeCount: 0,
      courseThumbnail: '',
      courseTitle: '',
      courseUpdatedAt: '',
      courseViewCount: 0,
      likeStatus: false,
      memberNickname: '',
      postContent: '',
      postCreatedAt: '',
      postId: -1,
      tags: [''],
    },
  ],
};

const myInfoDataListSlice = createSlice({
  name: 'myInfoData',
  initialState,
  reducers: {
    setDataCourse(state, action: PayloadAction<MypCourseSummaryT[]>) {
      state.memberCourseList = action.payload;
    },
    setDataBookMark(state, action: PayloadAction<MyBookMarkSummaryT[]>) {
      state.memberBookmarkedList = action.payload;
    },
  },
});

export const myInfoDataListReducer = myInfoDataListSlice.reducer;
export const myInfoDataListActions = myInfoDataListSlice.actions;
