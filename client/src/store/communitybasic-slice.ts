/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { InfiniteScrollT } from '../types/apitype';

const initialState = {
  communityList: [
    {
      communityListData: [
        {
          bookmarkStatus: false,
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
          memberEmail: '',
        },
      ],
      current_page: -1,
      isLast: false,
    },
  ],
};

const communityBasicSlice = createSlice({
  name: 'communityBasic',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<InfiniteScrollT[]>) {
      state.communityList = action.payload;
      // 기존 state.communityList 와 비교해서 달라진 일부 배열만 리덕스 샬롯 이퀄
    },
  },
});

export const communityBasicReducer = communityBasicSlice.reducer;
export const communityBasicActions = communityBasicSlice.actions;
