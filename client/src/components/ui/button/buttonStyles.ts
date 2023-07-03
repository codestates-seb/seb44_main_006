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
};
