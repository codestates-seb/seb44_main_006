import { styled } from 'styled-components';

import cssToken from '../../../styles/cssToken';
import SubTitle from '../text/SubTitle';
import CloseButton from '../button/CloseButton';
import { GoogleIcon } from '../../../assets/icons/GoogleIcon';
import { KakaoIcon } from '../../../assets/icons/KakaoIcon';
import { NaverIcon } from '../../../assets/icons/NaverIcon';

interface IModalContainer {
  width?: string;
  height?: string;
  borderradius?: string;
  gap?: string;
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${cssToken.WIDTH['w-screen']};
  height: ${cssToken.HEIGHT['h-screen']};
  z-index: 9999;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  opacity: 0.3;
  z-index: 10;
`;

const ModalContainer = styled.section<IModalContainer>`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderradius};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.gap};
  background-color: ${cssToken.COLOR.white};
  z-index: 20;
  @media (max-width: 768px) {
    border-radius: 0.9375rem 0.9375rem 0 0;
    width: 100%;
    bottom: 0;
    position: absolute;
    padding-bottom: 4.125rem;
  }
`;

const CloseButtonDiv = styled.div`
  width: ${cssToken.WIDTH['min-w-fit']};
  height: ${cssToken.HEIGHT['h-fit']};
  position: absolute;
  padding: 20px;
  top: 0;
  right: 0;
  z-index: 20;
`;

const Button = styled.button`
  border-radius: ${cssToken.BORDER['rounded-s']};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${cssToken.SPACING['gap-16']};
  font-size: ${cssToken.TEXT_SIZE['text-16']};
  padding: ${cssToken.SPACING['gap-10']};
  border-radius: ${cssToken.BORDER['rounded-s']};
  width: 70%;
  cursor: pointer;
`;

const GooleBtn = styled(Button)`
  background: ${cssToken.COLOR.white};
  border: 1px solid ${cssToken.COLOR['gray-700']};
  color: #9e9e9e;
  > svg {
    width: 30px;
  }
`;

const KaKaoBtn = styled(Button)`
  margin-top: 30px;
  background: #fae100;
  border: 1px solid #fae100;
  color: #000;
  > svg {
    width: 30px;
  }
`;

const NaverBtn = styled(Button)`
  background: #00c63b;
  border: 1px solid #00c63b;
  color: ${cssToken.COLOR.white};
  > svg {
    width: 25px;
  }
`;

const LoginModal = ({
  styles,
  handleClose,
}: {
  styles?: IModalContainer;
  handleClose?: () => void;
}) => {
  const handleLogin = ({ path }: { path: string }) => {
    const srcServerPath = import.meta.env.VITE_LOGIN_URL;
    window.location.href = `${srcServerPath}/oauth2/authorization/${path}?local`;
  };

  return (
    <ModalWrapper>
      <Backdrop onClick={handleClose} />
      <ModalContainer {...styles}>
        <SubTitle styles={{ size: cssToken.TEXT_SIZE['text-24'] }}>
          3초만에 끝!
        </SubTitle>
        <KaKaoBtn onClick={() => handleLogin({ path: 'kakao' })}>
          <KakaoIcon />
          카카오톡 로그인
        </KaKaoBtn>
        <NaverBtn onClick={() => handleLogin({ path: 'naver' })}>
          <NaverIcon />
          네이버 로그인
        </NaverBtn>
        <GooleBtn onClick={() => handleLogin({ path: 'google' })}>
          <GoogleIcon />
          구글 로그인
        </GooleBtn>
        <CloseButtonDiv>
          <CloseButton onClick={handleClose} />
        </CloseButtonDiv>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default LoginModal;
