import { styled } from 'styled-components';

import cssToken from './cssToken';

import { TextStyleT } from '../types/type';

export const TextStyle = styled.h3<TextStyleT>`
  font-size: ${(props) => (props.size ? props.size : '1rem')};
  color: ${(props) => (props.color ? props.color : 'black')};
  font-weight: ${(props) =>
    props.weight ? props.weight : cssToken.FONT_WEIGHT.bold};
`;

export const FlexDiv = styled.div`
  display: flex;
`;

export const CardWrapper = styled.div`
  width: 90%;
  place-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(405px, 405px));
  grid-auto-flow: row;
  gap: ${cssToken.SPACING['gap-50']};
`;
