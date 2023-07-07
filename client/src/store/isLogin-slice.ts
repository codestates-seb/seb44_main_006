/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
};

const isLoginSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    toggleOverlay(state) {
      state.isLogin = !state.isLogin;
    },
  },
});

export const isLoginReducer = isLoginSlice.reducer;
export const overlayActions = isLoginSlice.actions;
