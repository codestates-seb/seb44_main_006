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
    padding: 1.2rem 0.95rem 0.95rem;
    white-space: nowrap;
    transition: ${cssToken.TRANSITION.basic};
    font-size: 14px;
  }
`;

const Header = () => {
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
    (state: RootState): boolean => state.userAuth.isLoginOpen
  );
  const LogoutmodalIsOpen = useSelector(
    (state: RootState): boolean => state.userAuth.isLogoutOpen
  );

  const LogintoggleModal = () => {
    dispatch(setUserOAuthActions.toggleIsLogin());
  };

  const LogoutoggleModal = () => {
    dispatch(setUserOAuthActions.toggleIsLogout());
  };

  const mutation = useMutation(RemoveUserInfo, {
    onSuccess(data) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('isLogin');
      gotoMain();
      return window.location.reload();
    },
    onError(error) {
      console.log('Logout error:', error);
    },

  });

  const handleLogout = () => {
    mutation.mutate();
    dispatch(setUserOAuthActions.setIsLogin(false));
  };

  // TODO: Redux toolkit 이용해 전역으로 유저 정보 관리하기
  //! 유저 정보 새로고침해야 값을 받을 수 있는 이슈
  const { data: oauthInfo } = useQuery({
    queryKey: ['oauthInfoData'],
    queryFn: () => GetUserInfo(),
    onSuccess: (data) => {
      dispatch(setUserOAuthActions.setUserOAuth(data.data));
      if (accessToken) {
        localStorage.setItem('accessToken', `Bearer ${accessToken}`);
        localStorage.setItem('refreshToken', `${refreshToken}`);
        localStorage.setItem('isLogin', JSON.stringify(true));
        if (localStorage.getItem('isLogin')) {
          dispatch(setUserOAuthActions.setIsLogin(true));
        }
        gotoMain();
      }
    },
    onError: (error: AxiosError) => {
      if (accessToken) {
        const errStatus = error.response.status;
        navigate(`/error/${errStatus}`);
      }
    },
  });

  // useEffect(() => {
  //   console.log('1 oauthInfo 데이터 응답:', oauthInfo);
  //   console.log('2 isLoggedIn 로그인 유무:', isLoggedIn);
  //   console.log('3 userQAuthData 유저 정보:', userQAuthData);
  // }, []);

  useEffect(() => {
    setIsPath(location.pathname);
  }, [location]);

  return (
    <HeaderContainer isPath={isPath}>
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
              fontsize={cssToken.TEXT_SIZE['text-24']}
              borderRadius={cssToken.BORDER['rounded-md']}
              onClick={LogoutoggleModal}
            >
              아니오
            </GrayButton>
            <SkyBlueButton
              width="15.5625rem"
              height="4.625rem"
              fontsize={cssToken.TEXT_SIZE['text-24']}
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
      {/* <div>{`반갑습니다. ${userQAuthData.memberNickname}`}</div> */}
      <BtnBox>
        {isPath === '/' && isLoggedIn && (
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
        {isPath !== '/' && isLoggedIn && (
          // 메인 페이지가 아닌 나머지
          <>
            <WhiteButton
              onClick={LogoutmodalIsOpen}
              height="25px"
              borderRadius={`${cssToken.BORDER['rounded-tag']}`}
            >
              로그아웃
            </WhiteButton>
            <SkyBlueButton
              height="25px"
              borderRadius={`${cssToken.BORDER['rounded-tag']}`}
            >
              {isPath === '/community' ? '마이페이지' : '커뮤니티'}
            </SkyBlueButton>
          </>
        )}
        {isPath !== '/' && !isLoggedIn && (
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
