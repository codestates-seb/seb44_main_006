/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export type UserQAuthInfo = {
  memberEmail?: string;
  memberId?: number;
  memberImageUrl?: string;
  memberNickname?: string;
  myBookmarkCount?: number;
  myCourseCount?: number;
};

export interface LoginState {
  isLoginOpen?: boolean;
  isLogoutOpen?: boolean;
}

const initialState: LoginState = {
  isLoginOpen: false,
  isLogoutOpen: false,
};

const setUserOAuthSlice = createSlice({
  name: 'OAuthInfo',
  initialState,
  reducers: {
    toggleIsLogin(state) {
      state.isLoginOpen = !state.isLoginOpen;
    },
    toggleIsLogout(state) {
      state.isLogoutOpen = !state.isLogoutOpen;
    },
    openLoginModal(state) {
      state.isLoginOpen = true;
    },
    closeLoginModal(state) {
      state.isLoginOpen = false;
    },
    closeLogoutModal(state) {
      state.isLogoutOpen = false;
    },
  },
});

export const setUserOAuthReducer = setUserOAuthSlice.reducer;
export const setUserOAuthActions = setUserOAuthSlice.actions;
