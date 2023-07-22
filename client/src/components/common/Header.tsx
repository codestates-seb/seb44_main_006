import { styled } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Nav from './Nav';

import cssToken from '../../styles/cssToken';
import LogoBlack from '../../assets/common_img/logo_black.svg';
import LogoWhite from '../../assets/common_img/logo_white.svg';
import MemAccountModal from '../member/MemAccount';
import useLocationEndpoint from '../../hooks/useLocationEndpoint';
import getLoginStatus from '../../utils/getLoginStatus';

type HeaderStyle = {
  ispath?: string;
};

const HeaderContainer = styled.header<HeaderStyle>`
  display: ${(props) => {
    if (
      props?.ispath === 'register' ||
      props?.ispath === 'error' ||
      props?.ispath === 'setting'
    ) {
      return 'none';
    }
    return 'flex';
  }};
  align-items: center;
  justify-content: space-between;
  padding: ${cssToken.SPACING['gap-10']} ${cssToken.SPACING['gap-24']};
  border-bottom: 1px solid transparent;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  width: ${cssToken.WIDTH['w-full']};
  transition: 0.2s;
  z-index: 999;

  &.change_header {
    background: #fff;
    border-bottom: 1px solid ${cssToken.COLOR['gray-300']};
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.03);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoBox = styled.h1`
  width: 125px;
`;

const LogoImg = styled.img`
  width: ${cssToken.WIDTH['w-full']};
`;

const Header = () => {
  const ispath = useLocationEndpoint();
  const location = useLocation();
  const ispathPath = location.pathname;
  const isLogin = getLoginStatus();

  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });

  return (
    <>
      <MemAccountModal />
      <HeaderContainer
        className={scrollPosition < 80 ? '' : 'change_header'}
        ispath={ispath}
      >
        <LogoBox>
          <Link to="/">
            {ispathPath === '/community' && (
              <LogoImg
                src={scrollPosition < 80 ? LogoWhite : LogoBlack}
                alt="logo-harumate"
              />
            )}
            {ispathPath !== '/community' && (
              <LogoImg src={LogoBlack} alt="logo-harumate" />
            )}
          </Link>
        </LogoBox>
        <Nav
          scrollPosition={scrollPosition}
          ispath={ispath}
          isLoggedIn={isLogin}
        />
      </HeaderContainer>
    </>
  );
};

export default Header;
