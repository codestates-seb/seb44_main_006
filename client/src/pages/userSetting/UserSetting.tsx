import { styled } from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../../store';
import cssToken from '../../styles/cssToken';
import UserInfoMy from '../../components/ui/UserInfoPfp';
// import SkyBlueEventButton from '../../components/ui/button/SkyBlueEventButton';
import DarkIcon from '../../assets/DarkIcon';
import LightIcon from '../../assets/LightIcon';

const UserSettingContainer = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #f8f8f8;
`;

const SettingBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  width: 600px;
  height: 600px;
  background-color: #fff;
  flex-direction: column;
  gap: 50px;
`;

const ImgBox = styled.div`
`;

const SettingListUl = styled.ul`
  border-top: 1px solid #dcdcdc;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SettingList = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dcdcdc;
  padding: 20px;
  justify-content: center;

  span {
    flex: 1
  }
`;

const BtnBox = styled.div`
  flex: 1;
  dispaly: flex;
`


const UserSetting = () => {
  const userAuthInfo = useSelector(
    (state: RootState) => state.userAuth.userInfo
  );

  return (
    <UserSettingContainer>
      <SettingBox>
        <ImgBox>
          <UserInfoMy
            styles={{
              size: '10.75rem',
            }}
            src={userAuthInfo?.memberImageUrl}
          />
          {/* <SkyBlueEventButton>이미지 변경</SkyBlueEventButton> */}
        </ImgBox>
        <SettingListUl>
          <SettingList>
            <span>화면 테마 설정</span>
            <BtnBox>
              <button>라이트 모드</button>
              <button>다크 모드</button>
            </BtnBox>
          </SettingList>
          <SettingList>
            <span>계정관리</span>
            <BtnBox>
              <button>로그아웃</button>
              <button>회원탈퇴</button>
            </BtnBox>
          </SettingList>
        </SettingListUl>
      </SettingBox>
    </UserSettingContainer>
  )
};

export default UserSetting;
