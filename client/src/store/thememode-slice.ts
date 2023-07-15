/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface ThemeModeT {
  themeMode?: string;
}

const initialState: ThemeModeT = {
  themeMode: localStorage.getItem('themeMode') || 'light',
};

const setThemeModeSlice = createSlice({
  name: 'themeMode',
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<string>) {
      state.themeMode = action.payload;
      localStorage.setItem('themeMode', action.payload); // Store the selected theme mode in local storage
    },
  },
});


export const setThemeModeReducer = setThemeModeSlice.reducer;
export const setThemeModeActions = setThemeModeSlice.actions;
