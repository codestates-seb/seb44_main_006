import { styled } from 'styled-components';

import cssToken from '../../../styles/cssToken';

export const Button = styled.button`
  cursor: pointer;
  color: #7b7b7b;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    font-size: ${cssToken.TEXT_SIZE['text-12']};
  }
`;
