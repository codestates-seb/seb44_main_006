/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialT = {
  searchKeyword: string;
  selectedTab: 'First' | 'Second';
};

const initialState: InitialT = {
  searchKeyword: '',
  selectedTab: 'First',
};

const communityBasicSlice = createSlice({
  name: 'communityBasic',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.searchKeyword = action.payload;
    },
    setTab(state, action: PayloadAction<'First' | 'Second'>) {
      state.selectedTab = action.payload;
    },
    reset(state) {
      state.searchKeyword = '';
      state.selectedTab = 'First';
    },
  },
});

export const communityBasicReducer = communityBasicSlice.reducer;
export const communityBasicActions = communityBasicSlice.actions;
