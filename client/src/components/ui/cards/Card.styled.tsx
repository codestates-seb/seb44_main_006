import styled, { css } from 'styled-components';

import cssToken from '../../../styles/cssToken';

export const CardCommonBox = css`
  cursor: pointer;
  border: 0.0625rem solid ${cssToken.COLOR['gray-500']};
  border-radius: ${cssToken.BORDER['rounded-md']};
  transition: ${cssToken.TRANSITION.basic};

  &:hover {
    border: 0.0625rem solid ${cssToken.COLOR['point-900']};
  }
`;
