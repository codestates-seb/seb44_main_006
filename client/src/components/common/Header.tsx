import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { overlayActions } from '../../store/overlay-slice';
import { RootState } from '../../store';
import cssToken from '../../styles/cssToken';
import LogoBlack from '../../assets/common_img/logo_black.svg';
import WhiteButton from '../ui/button/WhiteButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import LoginModal from '../ui/modal/LoginModal';

type HeaderInfo = {
  ismainpage?: string;
};

const HeaderContainer = styled.header<HeaderInfo>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${cssToken.SPACING['gap-10']} ${cssToken.SPACING['gap-24']};
  background: ${(props) =>
    props.ismainpage ? 'transparent' : cssToken.COLOR.white};
  position: fixed;
  top: 0;
  left: 0;
  width: ${cssToken.WIDTH['w-full']};
  box-shadow: ${(props) =>
    props.ismainpage ? 'none' : cssToken.SHADOW['shadow-lg']};
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

const Header = ({ ismainpage }: HeaderInfo) => {
  const modalIsOpen = useSelector(
    (state: RootState): boolean => state.overlay.isOpen
  );
  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(overlayActions.toggleOverlay());
  };

  return (
    <HeaderContainer ismainpage={ismainpage}>
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
        <WhiteButton
          onClick={toggleModal}
          height="25px"
          borderRadius={`${cssToken.BORDER['rounded-tag']}`}
        >
          로그인
        </WhiteButton>

        {!ismainpage && (
          <>
            <WhiteButton
              height="25px"
              borderRadius={`${cssToken.BORDER['rounded-tag']}`}
            >
              로그인
            </WhiteButton>
            <WhiteButton
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
      </BtnBox>
    </HeaderContainer>
  );
};

export default Header;
