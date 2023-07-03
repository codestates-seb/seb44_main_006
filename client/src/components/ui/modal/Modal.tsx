import { styled } from 'styled-components';

import { Props } from '../../../types/type';
import CloseButton from '../button/CloseButton';
import cssToken from '../../../styles/cssToken';

interface IModalContainer {
  width?: string;
  height?: string;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${cssToken.SPACING['gap-16']};
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
