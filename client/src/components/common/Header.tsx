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
import { RootState } from '../../store';
import cssToken from '../../styles/cssToken';
import LogoBlack from '../../assets/common_img/logo_black.svg';
import WhiteButton from '../ui/button/WhiteButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import LoginModal from '../ui/modal/LoginModal';
import useMovePage from '../../hooks/useMovePage';
import { GetUserInfo } from '../../apis/api';
import { toggleIsLogin, setAccessToken, setUserInfo } from '../../store/isLogin-slice'

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
  const userInfoData = useSelector((state: RootState) => state.isLogin);
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');
  const navigate = useNavigate();
  const gotoMain = useMovePage('/');
  const dispatch = useDispatch();
  const [isPath, setIsPath] = useState<string>('');
  const location = useLocation();
  const isLoggedIn = useSelector((state: RootState) => state.isLogin);
  const modalIsOpen = useSelector(
    (state: RootState): boolean => state.overlay.isOpen
  );

  const toggleModal = () => {
    dispatch(overlayActions.toggleOverlay());
  };

  const handleLogout = () => {
    if (isLoggedIn.isLogin) {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isLogin');
      gotoMain();
      return window.location.reload();
    }
  };

  const { data } = useQuery({
    queryKey: ['userInfoData'],
    queryFn: GetUserInfo,
  });

  useEffect(() => {
    setIsPath(location.pathname);
  }, [location]);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
      localStorage.setItem('accessToken', JSON.stringify(`Bearer ${accessToken}`));
      localStorage.setItem('isLogin', JSON.stringify(true));

      axios
        .get(`${PROXY}/api/auth/members`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // AccessToken
            RefreshToken: `${refreshToken}`, // RefreshToken
          },
        })
        .then((res) => {
          localStorage.setItem('userInfo', JSON.stringify(res.data));
          // return gotoMain();
        })
        .catch((err) => {
          const errStatus: number = err.response.status;
          return navigate(`/error/${errStatus}`);
        });
    }
  }, []);


  return (
    <HeaderContainer isPath={isPath}>
      {modalIsOpen && (
        <LoginModal
          handleClose={toggleModal}
          styles={{
            width: '500px',
            height: '500px',
            borderradius: '15px',
            gap: '10px',
          }}
        />
      )}
      <LogoBox>
        <Link to="/">
          <LogoImg src={LogoBlack} alt="logo-harumate" />
        </Link>
      </LogoBox>
      <BtnBox>
        {isPath === '/' && isLoggedIn.isLogin && (
          // 메인 페이지인 경우
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
        {isPath !== '/' && isLoggedIn.isLogin && (
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
            onClick={toggleModal}
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
