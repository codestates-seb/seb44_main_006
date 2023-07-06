import { styled } from 'styled-components';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

import { overlayActions } from '../../store/overlay-slice';
import { RootState } from '../../store';
import cssToken from '../../styles/cssToken';
import LogoBlack from '../../assets/common_img/logo_black.svg';
import WhiteButton from '../ui/button/WhiteButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import LoginModal from '../ui/modal/LoginModal';
import useMovePage from '../../hooks/useMovePage';

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
  const navigate = useNavigate();
  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  const [searchParams, setSertchParams] = useSearchParams<string>();
  const accessToken = searchParams.get('access_token');
  const gotoMain = useMovePage('/');
  const modalIsOpen = useSelector(
    (state: RootState): boolean => state.overlay.isOpen
  );
  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(overlayActions.toggleOverlay());
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLogin');
    return gotoMain();
  };

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      localStorage.setItem('isLogin', JSON.stringify(true));

      axios
        .get(`${PROXY}/auth/members`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // AccessToken
            RefreshToken: `${accessToken}`, // RefreshToken
          },
        })
        .then((res) => {
          localStorage.setItem('userInfo', JSON.stringify(res.data));
          return gotoMain();
        })
        .catch((err) => {
          return navigate(`/error/${err.response.status}`);
        });
    }
  });

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
      </BtnBox>
    </HeaderContainer>
  );
};

export default Header;
