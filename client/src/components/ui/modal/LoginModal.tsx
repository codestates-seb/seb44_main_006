import { styled } from 'styled-components';
import axios from 'axios';

import CloseButton from '../button/CloseButton';
import cssToken from '../../../styles/cssToken';
import GoogleIcon from '../../../assets/icons/GoogleIcon';
import KakaoIcon from '../../../assets/icons/KakaoIcon';
import NaverIcon from '../../../assets/icons/NaverIcon';
import SubTitle from '../text/SubTitle';

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

  const handlekakaoLogin = () => {
    window.location.href =
      'http://ec2-52-78-64-106.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao';
  };

  return (
    <ModalWrapper>
      <Backdrop onClick={handleClose} />
      <ModalContainer {...styles}>
        <SubTitle styles={{ size: cssToken.TEXT_SIZE['text-24'] }}>
          3초만에 끝!
        </SubTitle>
        <KaKaoBtn onClick={handlekakaoLogin}>
          <KakaoIcon />
          카카오톡 로그인
        </KaKaoBtn>
        <NaverBtn>
          <NaverIcon />
          네이버 로그인
        </NaverBtn>
        <GooleBtn>
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
