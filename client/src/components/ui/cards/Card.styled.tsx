import { css } from 'styled-components';

import cssToken from '../../../styles/cssToken';

export const CardCommonBox = css<{ selected?: boolean }>`
  position: relative;
  cursor: pointer;
  border-radius: ${cssToken.BORDER['rounded-md']};
  transition: ${cssToken.TRANSITION.basic};
  background-color: white;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    border-radius: 15px;
    display: block;
    box-sizing: border-box;
    border: ${(props) =>
      props.selected
        ? `2px solid ${cssToken.COLOR['point-500']}`
        : `1px solid ${cssToken.COLOR['gray-500']}`};
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    transition: 0.1s;
    z-index: -1;
  }

  &:hover::after {
    border: 2px solid ${cssToken.COLOR['point-500']};
  }
`;
