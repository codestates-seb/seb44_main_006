import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Nav from './Nav';

import { RootState } from '../../store';
import cssToken from '../../styles/cssToken';
import LogoBlack from '../../assets/common_img/logo_black.svg';
import MemAccountModal from '../member/MemAccount';
import useLocationEndpoint from '../../hooks/useLocationEndpoint';

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
  background: ${(props) =>
    props?.ispath === '' ? 'transparent' : cssToken.COLOR.white};
  position: fixed;
  top: 0;
  left: 0;
  width: ${cssToken.WIDTH['w-full']};
  box-shadow: ${(props) =>
    props?.ispath === '' ? 'none' : cssToken.SHADOW['shadow-lg']};
  z-index: 999;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoBox = styled.h1`
  width: 150px;
`;

const LogoImg = styled.img`
  width: ${cssToken.WIDTH['w-full']};
`;

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.userAuth.isLogin);
  const ispath = useLocationEndpoint();

  return (
    <>
      <MemAccountModal />
      <HeaderContainer ispath={ispath}>
        <LogoBox>
          <Link to="/">
            <LogoImg src={LogoBlack} alt="logo-harumate" />
          </Link>
        </LogoBox>
        <Nav ispath={ispath} isLoggedIn={isLoggedIn} />
      </HeaderContainer>
    </>
  );
};

export default Header;
