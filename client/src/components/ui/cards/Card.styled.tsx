import { css } from 'styled-components';

import cssToken from '../../../styles/cssToken';

export const CardCommonBox = css<{ selected?: boolean }>`
  position: relative;
  cursor: pointer;
  border: ${(props) =>
    props.selected
      ? `2px solid ${cssToken.COLOR['point-500']}`
      : `2px solid ${cssToken.COLOR['gray-500']};`};
  border-radius: ${cssToken.BORDER['rounded-md']};
  transition: ${cssToken.TRANSITION.basic};

  &:hover {
    border: 2px solid ${cssToken.COLOR['point-500']};
    box-shadow: 0 0 0, rgba(0 0 0, 0.5);
  }
`;
