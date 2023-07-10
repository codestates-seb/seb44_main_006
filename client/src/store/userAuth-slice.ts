/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

type UserQAuthInfo = {
  memberEmail?: string;
  memberId?: number;
  memberImageUrl?: string;
  memberNickname?: string;
  myBookmarkCount?: number;
  myCourseCount?: number;
}

interface LoginState {
  isLogin?: string | boolean;
  userInfo?: UserQAuthInfo;
  isLoginOpen?: boolean | undefined;
  isLogoutOpen?: boolean | undefined;
}

const logined = localStorage.getItem('isLogin');
const transLogined = JSON.parse(logined);

const initialState: LoginState = {
  isLogin: transLogined,
  userInfo: {},
  isLoginOpen: false,
  isLogoutOpen: false,
};

const setUserOAuthSlice = createSlice({
  name: 'OAuthInfo',
  initialState,
  reducers: {
    setIsLogin(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
    setUserOAuth: (state, action: PayloadAction<UserQAuthInfo>) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    toggleIsLogin(state) {
      state.isLoginOpen = !state.isLoginOpen;
    },
    toggleIsLogout(state) {
      state.isLogoutOpen = !state.isLogoutOpen;
    },
  },
});

export const setUserOAuthReducer = setUserOAuthSlice.reducer;
export const setUserOAuthActions = setUserOAuthSlice.actions;
