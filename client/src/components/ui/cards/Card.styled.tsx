import { css } from 'styled-components';

import cssToken from '../../../styles/cssToken';

export const CardCommonBox = css<{ selected?: boolean }>`
  cursor: pointer;
  border: ${(props) =>
    props.selected
      ? `2px solid ${cssToken.COLOR['point-900']}`
      : `2px solid ${cssToken.COLOR['gray-500']};`};
  border-radius: ${cssToken.BORDER['rounded-md']};
  transition: ${cssToken.TRANSITION.basic};
  &:hover {
    border: 2px solid ${cssToken.COLOR['point-900']};
  }
`;
