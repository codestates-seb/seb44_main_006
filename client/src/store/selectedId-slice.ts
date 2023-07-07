/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  tagId: '',
  categoryId: '',
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
  },
});

export const selectedIdReducer = selectedIdSlice.reducer;
export const selectedIdActions = selectedIdSlice.actions;
