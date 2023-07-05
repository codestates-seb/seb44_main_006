import { styled } from 'styled-components';

import { Props } from '../../../types/type';
import CloseButton from '../button/CloseButton';

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
  width: 100vw;
  height: 100vh;
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
  background-color: #ffffff;
  z-index: 20;
`;

const CloseButtonDiv = styled.div`
  width: fit-content;
  height: fit-content;
  position: absolute;
  padding: 8px;
  top: 0;
  right: 0;
  z-index: 20;
`;

const Modal = ({
  children,
  styles,
}: {
  children?: Props['children'];
  styles?: IModalContainer;
}) => {
  const handleClick = () => {
    console.log('click');
  };
  return (
    <ModalWrapper>
      <Backdrop />
      <ModalContainer {...styles}>
        {children}
        <CloseButtonDiv>
          <CloseButton onClick={handleClick} />
        </CloseButtonDiv>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default Modal;
