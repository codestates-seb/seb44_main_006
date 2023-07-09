import { styled } from 'styled-components';
import {
  useNavigate,
  Link,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { overlayActions } from '../../store/overlay-slice';
import { setUserOAuth } from '../../store/userAuth-slice';
import { RootState } from '../../store';
import cssToken from '../../styles/cssToken';
import LogoBlack from '../../assets/common_img/logo_black.svg';
import WhiteButton from '../ui/button/WhiteButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import LoginModal from '../ui/modal/LoginModal';
import Modal from '../ui/modal/Modal';
import useMovePage from '../../hooks/useMovePage';
import { GetUserInfo, RemoveUserInfo } from '../../apis/api';
import GrayButton from '../ui/button/GrayButton';

type HeaderStyle = {
  isPath?: string;
};

const HeaderContainer = styled.header<HeaderStyle>`
  display: ${(props) => (props?.isPath === '/register' ? 'none' : 'flex')};
  align-items: center;
  justify-content: space-between;
  padding: ${cssToken.SPACING['gap-10']} ${cssToken.SPACING['gap-24']};
  background: ${(props) =>
    props?.isPath === '/' ? 'transparent' : cssToken.COLOR.white};
  position: fixed;
  top: 0;
  left: 0;
  width: ${cssToken.WIDTH['w-full']};
  box-shadow: ${(props) =>
    props?.isPath === '/' ? 'none' : cssToken.SHADOW['shadow-lg']};
  z-index: 999;
`;

const LogoBox = styled.h1`
  width: 150px;
`;

const LogoImg = styled.img`
  width: ${cssToken.WIDTH['w-full']};
`;

const BtnBox = styled.div`
  display: flex;
  gap: ${cssToken.SPACING['gap-10']};

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 13.5px 10px 10px;
    white-space: nowrap;
    transition: ${cssToken.TRANSITION.basic};
  }
`;

const Header = () => {
  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');
  const navigate = useNavigate();
  const gotoMain = useMovePage('/');
  const dispatch = useDispatch();
  const [isPath, setIsPath] = useState<string>('');
  const location = useLocation();
  const isLoggedIn = useSelector((state: RootState) => state.userAuth.isLogin);
  const userQAuthData = useSelector(
    (state: RootState) => state.userAuth.userInfo
  );
  const LoginmodalIsOpen = useSelector(
    (state: RootState): boolean => state.overlay.isOpen
  );
  const modalIsOpen = useSelector(
    (state: RootState): boolean => state.overlay.isOpen
  );

  const LogintoggleModal = () => {
    dispatch(overlayActions.toggleOverlay());
  };

  const toggleModal = () => {
    dispatch(overlayActions.toggleOverlay());
  };

  const mutation = useMutation(RemoveUserInfo, {
    onSuccess(data) {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isLogin');
      localStorage.removeItem('refreshToken');
      gotoMain();
      return window.location.reload();
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  // TODO: React Query 이용해서 리팩토링하기
  // TODO: Redux toolkit 이용해 전역으로 유저 정보 관리하기
  const { data: oauthInfo } = useQuery({
    queryKey: ['oauthInfoData'],
    queryFn: () => GetUserInfo(),
    onSuccess: (data) => {
      if (accessToken) {
        localStorage.setItem('refreshToken', `${refreshToken}`);
        localStorage.setItem('accessToken', `Bearer ${accessToken}`);
        localStorage.setItem('isLogin', JSON.stringify(true));
        dispatch(setUserOAuth({ dd: 'ee', ww: 'tt' }));
        gotoMain();
      }

      console.log('oauthInfo', data.data);
      console.log('userQAuthData', userQAuthData);
    },

    onError: (error) => {
      if (accessToken) {
        const errStatus: number = error.response.status;
        navigate(`/error/${errStatus}`);
      }
    },
  });

  useEffect(() => {
    setIsPath(location.pathname);
  }, [location]);

  return (
    <HeaderContainer isPath={isPath}>
      {LoginmodalIsOpen && (
        <LoginModal
          handleClose={LogintoggleModal}
          styles={{
            width: '500px',
            height: '500px',
            borderradius: '15px',
            gap: '10px',
          }}
        />
      )}
      {/* {modalIsOpen && (
        <Modal
          backdropCallback={toggleModal}
          handleCloseBtn={toggleModal}
          styles={{
            width: '500px',
            height: '500px',
            borderradius: '15px',
            gap: '10px',
          }}>
          로그아웃 하시겠습니까?
        </Modal>
      )} */}

      <LogoBox>
        <Link to="/">
          <LogoImg src={LogoBlack} alt="logo-harumate" />
        </Link>
      </LogoBox>
      <BtnBox>
        {isPath === '/' && isLoggedIn && (
          // 메인 페이지인 경우
          <>
            <WhiteButton
              // onClick={toggleModal}
              onClick={handleLogout}
              height="25px"
              borderRadius={`${cssToken.BORDER['rounded-tag']}`}
            >
              로그아웃
            </WhiteButton>
            <SkyBlueButton
              height="25px"
              borderRadius={`${cssToken.BORDER['rounded-tag']}`}
            >
              마이페이지
            </SkyBlueButton>
          </>
        )}
        {isPath !== '/' && isLoggedIn && (
          // 메인 페이지가 아닌 나머지
          <>
            <WhiteButton
              onClick={handleLogout}
              height="25px"
              borderRadius={`${cssToken.BORDER['rounded-tag']}`}
            >
              로그아웃
            </WhiteButton>
            <SkyBlueButton
              height="25px"
              borderRadius={`${cssToken.BORDER['rounded-tag']}`}
            >
              마이페이지
            </SkyBlueButton>
          </>
        )}
        {isPath !== '/' && !isLoggedIn.isLogin && (
          <WhiteButton
            onClick={LogintoggleModal}
            height="25px"
            borderRadius={`${cssToken.BORDER['rounded-tag']}`}
          >
            로그인
          </WhiteButton>
        )}
      </BtnBox>
    </HeaderContainer>
  );
};

export default Header;
