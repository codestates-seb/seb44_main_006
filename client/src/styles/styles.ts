import { styled } from 'styled-components';

import cssToken from './cssToken';

import { TextStyleT } from '../types/type';

export const TextStyle = styled.h3<TextStyleT>`
  font-size: ${(props) => (props.size ? props.size : '1rem')};
  color: ${(props) => (props.color ? props.color : 'black')};
  font-weight: ${(props) =>
    props.weight ? props.weight : cssToken.FONT_WEIGHT.bold};
`;
