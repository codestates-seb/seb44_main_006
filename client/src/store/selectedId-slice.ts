/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  tagId: '1',
  categoryId: '',
  thumbnailId: '',
};

const selectedIdSlice = createSlice({
  name: 'selectedId',
  initialState,
  reducers: {
    setTagId(state, action: PayloadAction<string>) {
      state.tagId = action.payload;
    },
    setCategoryId(state, action: PayloadAction<string>) {
      state.categoryId = action.payload;
    },
    setThumbnailId(state, action: PayloadAction<string>) {
      state.thumbnailId = action.payload;
    },
    allReset(state) {
      state.tagId = '1';
      state.categoryId = '';
      state.thumbnailId = '';
    },
  },
});

export const selectedIdReducer = selectedIdSlice.reducer;
export const selectedIdActions = selectedIdSlice.actions;
