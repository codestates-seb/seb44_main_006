import { css } from 'styled-components';

import cssToken from '../../../styles/cssToken';

export const CardCommonBox = css<{ selected?: boolean }>`
  cursor: pointer;
  border: ${(props) =>
    props.selected
      ? `0.125rem solid ${cssToken.COLOR['point-900']}`
      : `0.0625rem solid ${cssToken.COLOR['gray-500']};`};
  border-radius: ${cssToken.BORDER['rounded-md']};
  transition: ${cssToken.TRANSITION.basic};
  &:hover {
    border: ${(props) => (props.selected ? '0.125rem' : '0.0625rem')} solid
      ${cssToken.COLOR['point-900']};
  }
`;
