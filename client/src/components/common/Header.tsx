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
import { AxiosError } from 'axios';

import { setUserOAuthActions } from '../../store/userAuth-slice';
import { RootState } from '../../store';
import cssToken from '../../styles/cssToken';
import LogoBlack from '../../assets/common_img/logo_black.svg';
import WhiteButton from '../ui/button/WhiteButton';
import GrayButton from '../ui/button/GrayButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import LoginModal from '../ui/modal/LoginModal';
import Modal from '../ui/modal/Modal';
import useMovePage from '../../hooks/useMovePage';
import { GetUserInfo, RemoveUserInfo } from '../../apis/api';
import Text from '../ui/text/Text';

type HeaderStyle = {
  ispath?: string;
};

const HeaderContainer = styled.header<HeaderStyle>`
  display: ${(props) => (props?.ispath === '/register' ? 'none' : 'flex')};
  align-items: center;
  justify-content: space-between;
  padding: ${cssToken.SPACING['gap-10']} ${cssToken.SPACING['gap-24']};
  background: ${(props) =>
    props?.ispath === '/' ? 'transparent' : cssToken.COLOR.white};
  position: fixed;
  top: 0;
  left: 0;
  width: ${cssToken.WIDTH['w-full']};
  box-shadow: ${(props) =>
    props?.ispath === '/' ? 'none' : cssToken.SHADOW['shadow-lg']};
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
    padding: 1.2rem 0.95rem 0.95rem;
    white-space: nowrap;
    transition: ${cssToken.TRANSITION.basic};
    font-size: 14px;
  }
`;

const Header = () => {
  const [searchParams] = useSearchParams();
  const accessToken: string | null = searchParams.get('access_token');
  const refreshToken: string | null = searchParams.get('refresh_token');
  const navigate = useNavigate();
  const gotoMain = useMovePage('/');
  const dispatch = useDispatch();
  const [ispath, setIsPath] = useState<string>('');
  const location = useLocation();
  const isLoggedIn = useSelector((state: RootState) => state.userAuth.isLogin);
  const LoginmodalIsOpen = useSelector(
    (state: RootState) => state.userAuth.isLoginOpen
  );
  const LogoutmodalIsOpen = useSelector(
    (state: RootState) => state.userAuth.isLogoutOpen
  );

  const LogintoggleModal = () => {
    dispatch(setUserOAuthActions.toggleIsLogin());
  };

  const LogoutoggleModal = () => {
    dispatch(setUserOAuthActions.toggleIsLogout());
  };

  //! 연속으로 로그아웃 할 경우 에러 발생
  const mutation = useMutation(RemoveUserInfo, {
    onSuccess() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('isLogin');
      gotoMain();
      window.location.reload();
    },
    onError(error) {
      navigate(`/error/${error.status as string}`);
    },
  });

  const handleLogout = () => {
    mutation.mutate();
    dispatch(setUserOAuthActions.setIsLogin(false));
  };

  //! 유저 정보 새로고침해야 값을 받을 수 있는 이슈
  const { data: oauthInfo } = useQuery({
    queryKey: ['oauthInfoData'],
    queryFn: () => GetUserInfo(),
    onSuccess: (data) => {
      dispatch(setUserOAuthActions.setUserOAuth(data.data));
      if (accessToken) {
        localStorage.setItem('accessToken', `Bearer ${accessToken}`);
        localStorage.setItem('refreshToken', `${refreshToken}`);
        localStorage.setItem('isLogin', 'true');
        if (localStorage.getItem('isLogin')) {
          dispatch(setUserOAuthActions.setIsLogin(true));
        }
        gotoMain();
      }
    },
    onError: (error: AxiosError) => {
      if (accessToken) {
        navigate(`/error/${error.status as string}`);
      }
    },
  });

  useEffect(() => {
    setIsPath(location.pathname);
  }, [location]);

  return (
    <HeaderContainer ispath={ispath}>
      {LoginmodalIsOpen && (
        <LoginModal
          handleClose={LogintoggleModal}
          styles={{
            width: '31.25rem',
            height: '31.25rem',
            borderradius: '0.9375rem',
            gap: '0.625rem',
          }}
        />
      )}
      {LogoutmodalIsOpen && (
        <Modal
          backdropCallback={LogoutoggleModal}
          handleCloseBtn={LogoutoggleModal}
          displayclosebtn
          styles={{
            width: '47.0625rem',
            height: '28.375rem',
            borderradius: '0.9375rem',
            gap: '3.125rem',
          }}
        >
          <Text styles={{ size: cssToken.TEXT_SIZE['text-50'] }}>
            로그아웃 하시겠습니까?
          </Text>
          <BtnBox>
            <GrayButton
              width="15.5625rem"
              height="4.625rem"
              // fontsize={cssToken.TEXT_SIZE['text-24']}
              borderRadius={cssToken.BORDER['rounded-md']}
              onClick={LogoutoggleModal}
            >
              아니오
            </GrayButton>
            <SkyBlueButton
              width="15.5625rem"
              height="4.625rem"
              // fontsize={cssToken.TEXT_SIZE['text-24']}
              borderRadius={cssToken.BORDER['rounded-md']}
              onClick={handleLogout}
            >
              예
            </SkyBlueButton>
          </BtnBox>
        </Modal>
      )}

      <LogoBox>
        <Link to="/">
          <LogoImg src={LogoBlack} alt="logo-harumate" />
        </Link>
      </LogoBox>
      <BtnBox>
        {ispath === '/' && isLoggedIn && (
          // 메인 페이지인 경우
          <>
            <WhiteButton
              onClick={LogoutoggleModal}
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
        {ispath !== '/' && isLoggedIn && (
          // 메인 페이지가 아닌 나머지
          <>
            <WhiteButton
              onClick={LogoutoggleModal}
              height="25px"
              borderRadius={`${cssToken.BORDER['rounded-tag']}`}
            >
              로그아웃
            </WhiteButton>
            <SkyBlueButton
              height="25px"
              borderRadius={`${cssToken.BORDER['rounded-tag']}`}
            >
              {ispath === '/community' ? '마이페이지' : '커뮤니티'}
            </SkyBlueButton>
          </>
        )}
        {ispath !== '/' && !isLoggedIn && (
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
