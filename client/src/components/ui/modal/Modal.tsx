import { styled } from 'styled-components';
import ReactDOM from 'react-dom';

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
  z-index: 1002;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  opacity: 0.3;
  z-index: 1001;
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
  z-index: 1002;
`;

const CloseButtonDiv = styled.div`
  width: fit-content;
  height: fit-content;
  position: absolute;
  padding: 8px;
  top: 0;
  right: 0;
  z-index: 1002;
`;

const Modal = ({
  children,
  styles,
  backdropCallback,
  handleCloseBtn,
}: {
  children?: Props['children'];
  styles?: IModalContainer;
  backdropCallback?: () => void;
  handleCloseBtn?: () => void;
}) => {
  return ReactDOM.createPortal(
    <ModalWrapper>
      <Backdrop onClick={backdropCallback} />
      <ModalContainer {...styles}>
        {children}
        <CloseButtonDiv>
          <CloseButton onClick={handleCloseBtn} />
        </CloseButtonDiv>
      </ModalContainer>
    </ModalWrapper>,
    document.getElementById('overlay-root')!
  );
};

export default Modal;
