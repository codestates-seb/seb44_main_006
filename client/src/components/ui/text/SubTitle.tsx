import { styled } from 'styled-components';

import { Props, TextStyleT } from '../../../types/type';

const H3 = styled.h3<TextStyleT>`
  font-size: ${(props) => (props.size ? props.size : '1rem')};
  color: ${(props) => (props.color ? props.color : 'black')};
  font-weight: ${(props) => (props.weight ? props.weight : 'Bold')};
`;

const SubTitle = ({ children, styles }: Props) => {
  return <H3 {...styles}>{children}</H3>;
};

export default SubTitle;
