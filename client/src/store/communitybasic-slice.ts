/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { InfiniteScrollT } from '../types/apitype';

const initialState = {
  communityList: [
    {
      communityListData: [],
      current_page: 1,
      isLast: false,
    },
  ],
};

const communityBasicSlice = createSlice({
  name: 'communityBasic',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<InfiniteScrollT[]>) {
      console.log(action.payload);

      state.communityList = action.payload;
    },
  },
});

export const communityBasicReducer = communityBasicSlice.reducer;
export const communityBasicActions = communityBasicSlice.actions;
