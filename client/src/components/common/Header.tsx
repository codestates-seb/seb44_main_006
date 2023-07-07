import { styled } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { overlayActions } from '../../store/overlay-slice';
import { RootState } from '../../store';
import cssToken from '../../styles/cssToken';
import LogoBlack from '../../assets/common_img/logo_black.svg';
import WhiteButton from '../ui/button/WhiteButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import LoginModal from '../ui/modal/LoginModal';
import useAuthInfo from '../../hooks/useAuthInfo';
import useMovePage from '../../hooks/useMovePage';

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
  const [isPath, setIsPath] = useState<string>('');
  const location = useLocation();
  const gotoMain = useMovePage('/');
  const isLogin: string = localStorage.getItem('isLogin') || '';
  const modalIsOpen = useSelector(
    (state: RootState): boolean => state.overlay.isOpen
  );
  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(overlayActions.toggleOverlay());
  };

  const handleLogout = () => {
    if (JSON.parse(isLogin)) {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isLogin');
      gotoMain();
      return window.location.reload();
    }
  };

  useEffect(() => {
    setIsPath(location.pathname);
    console.log(isPath);
    console.log('login', isLogin);
  }, [isLogin, isPath, location]);

  useAuthInfo();

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
        {isPath === '/' ? (
          isLogin ? (
            // '/'경로이며 로인 상태
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
          ) : null
        ) : isLogin ? (
          // '/'경로가 아니며 로그인 상태
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
        ) : (
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
