import { styled } from 'styled-components';

import cssToken from '../../styles/cssToken';
import LogoBlack from '../../assets/common_img/logo_black.svg';
import WhiteButton from '../ui/button/WhiteButton';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${cssToken.SPACING['gap-10']} ${cssToken.SPACING['gap-24']};
  background: ${cssToken.COLOR.white};
  position: fixed;
  top: 0;
  left: 0;
  width: ${cssToken.WIDTH['w-full']};
  box-shadow: ${cssToken.SHADOW['shadow-lg']};
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
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoBox>
        <a href="/">
          <LogoImg src={LogoBlack} alt="logo-harumate" />
        </a>
      </LogoBox>
      <BtnBox>
        <WhiteButton>로그인</WhiteButton>
      </BtnBox>
    </HeaderContainer>
  );
};

export default Header;
