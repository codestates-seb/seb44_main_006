import { css } from 'styled-components';

import cssToken from '../../../styles/cssToken';

export const BUTTON_STYLES = {
  // 예시
  circle: css`
    color: ${cssToken.COLOR.black};
    background-color: ${cssToken.COLOR.white};
    border-radius: ${cssToken.BORDER['rounded-full']};
    box-shadow: ${cssToken.SHADOW['shadow-lg']};
  `,
  nobgbtn: css`
    padding: 7px;
    border-radius: 10px;
    &:hover {
      background-color: ${cssToken.COLOR['gray-300']};
    }
  `,
};

export const Button640 = css`
  @media screen and (max-width: 640px) {
    font-size: 0.875rem;
    width: fit-content;
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;
