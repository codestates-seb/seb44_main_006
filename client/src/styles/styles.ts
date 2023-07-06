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

export const HeadDiv = styled(FlexDiv)`
  flex-direction: column;
  row-gap: 3px;
`;

export const GapDiv = styled(FlexDiv)`
  flex-direction: column;
  row-gap: ${cssToken.SPACING['gap-24']};
`;

export const OutsideWrap = styled(FlexDiv)`
  margin-top: 77px;
  padding-top: ${cssToken.SPACING['px-50']};
  padding-left: ${cssToken.SPACING['py-100']};
  padding-right: ${cssToken.SPACING['py-100']};
  flex-direction: column;
  row-gap: ${cssToken.SPACING['gap-50']};
`;

export const TagDiv = styled(FlexDiv)`
  column-gap: 0.5rem;
`;
