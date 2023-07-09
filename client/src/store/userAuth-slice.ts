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
}

const initialState: LoginState = {
  isLogin: false,
  userInfo: {},
};

const setUserOAuthSlice = createSlice({
  name: 'OAuthInfo',
  initialState,
  reducers: {
    toggleIsLogin(state, action: PayloadAction<boolean>) {
      state.isLogin = !action.payload;
    },
    setUserOAuth: (state, action: PayloadAction<UserQAuthInfo>) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },
});

export const setUserOAuthReducer = setUserOAuthSlice.reducer;
export const { toggleIsLogin, setUserOAuth } = setUserOAuthSlice.actions;
