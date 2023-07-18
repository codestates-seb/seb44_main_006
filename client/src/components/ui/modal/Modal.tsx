import { styled } from 'styled-components';
import ReactDOM from 'react-dom';
import React from 'react';

import { Props } from '../../../types/type';
import cssToken from '../../../styles/cssToken';

interface IModalContainer {
  width?: string;
  height?: string;
  borderradius?: string;
  gap?: string;
  position?: string;
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
  z-index: 1000;

  @media screen and (max-width: 768px) {
    &.modal {
      align-items: end;
    }
  }
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

  &.modalContainer {
    @media screen and (max-width: 768px) {
      position: fixed;
      bottom: 0;

      width: ${cssToken.WIDTH['w-full']};
      height: 15.5625rem;

      border-radius: none;
      border-top-left-radius: ${cssToken.BORDER['rounded-md']};
      border-top-right-radius: ${cssToken.BORDER['rounded-md']};

      justify-content: space-around;
      font-weight: ${cssToken.FONT_WEIGHT.medium};

      > div {
        padding-top: ${cssToken.SPACING['gap-50']};
        padding-left: ${cssToken.SPACING['gap-20']};
        padding-right: ${cssToken.SPACING['gap-20']};
        align-items: center;
      }

      p {
        display: flex;
        justify-content: center;
        font-size: ${cssToken.TEXT_SIZE['text-16']};
        font-weight: ${cssToken.FONT_WEIGHT.medium};
      }

      button {
        height: 3rem;
      }

      .gray {
        width: 10rem;
      }

      .skyblue {
        width: 10rem;
      }
    }
    @media screen and (max-width: 500px) {
      button {
        height: 2.1875rem;
      }

      .gray {
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        width: 8.5rem;
      }

      .skyblue {
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        width: 8.5rem;
      }
    }
  }
`;

const Modal = ({
  children,
  styles,
  backdropCallback,
  className,
}: {
  children?: Props['children'];
  styles?: IModalContainer;
  backdropCallback?: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleCloseBtn?: () => void;
  className?: string[];
}) => {
  return ReactDOM.createPortal(
    <ModalWrapper className={className ? className[0] : ''}>
      <Backdrop onClick={backdropCallback} />
      <ModalContainer
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
        }}
        className={className ? className[1] : ''}
        {...styles}
      >
        {children}
      </ModalContainer>
    </ModalWrapper>,
    document.getElementById('overlay-root')!
  );
};

export default Modal;
