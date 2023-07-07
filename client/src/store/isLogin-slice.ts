/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

interface UserQAuthInfo {
  memberEmail?: string;
  memberId?: number;
  memberImageUrl?: string;
  memberNickname?: string;
  myBookmarkCount?: number;
  myCourseCount?: number;
}
interface LoginState {
  isLogin?: string | boolean;
  accessToken?: string;
  userInfo?: UserQAuthInfo;
}

const storedIsLogin = localStorage.getItem('isLogin') || '';
const storedAccessToken = localStorage.getItem('accessToken') || '';
const storedUserInfo = localStorage.getItem('userInfo') || '';

const initialState: LoginState = {
  isLogin: storedIsLogin,
  accessToken: storedAccessToken,
  userInfo: storedUserInfo,
};

const isLoginSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    toggleIsLogin(state, action: PayloadAction<string>) {
      state.isLogin = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<UserQAuthInfo>) => {
      state.userInfo = action.payload;
    },
  },
});

export const isLoginReducer = isLoginSlice.reducer;
export const { toggleIsLogin, setAccessToken, setUserInfo } = isLoginSlice.actions;
