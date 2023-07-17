/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export type UserQAuthInfo = {
  memberEmail?: string;
  memberId?: number;
  memberImageUrl?: string;
  memberNickname?: string;
  myBookmarkCount?: number;
  myCourseCount?: number;
};

export interface LoginState {
  isLogin?: boolean;
  userInfo?: UserQAuthInfo;
  isLoginOpen?: boolean;
  isLogoutOpen?: boolean;
  nickName?: string;
}

const logined = localStorage.getItem('isLogin');
const transLogined = logined ? !!JSON.parse(logined) : false;

const initialState: LoginState = {
  isLogin: transLogined,
  userInfo: {},
  isLoginOpen: false,
  isLogoutOpen: false,
  nickName: '',
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
    paintMemNickname(state, action: PayloadAction<string>) {
      state.nickName = action.payload;
    },
    openLoginModal(state) {
      state.isLoginOpen = true;
    },
    closeLoginModal(state) {
      state.isLoginOpen = false;
    },
  },
});

export const setUserOAuthReducer = setUserOAuthSlice.reducer;
export const setUserOAuthActions = setUserOAuthSlice.actions;
