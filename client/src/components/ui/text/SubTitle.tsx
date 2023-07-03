import { styled } from 'styled-components';

import { Props, TextStyleT } from '../../../types/type';
import cssToken from '../../../styles/cssToken';

const H3 = styled.h3<TextStyleT>`
  font-size: ${(props) => (props.size ? props.size : '1rem')};
  color: ${(props) => (props.color ? props.color : 'black')};
  font-weight: ${(props) =>
    props.weight ? props.weight : cssToken.FONT_WEIGHT.bold};
`;

const SubTitle = ({
  children,
  styles,
}: {
  children: Props['children'];
  styles?: TextStyleT;
}) => {
  return <H3 {...styles}>{children}</H3>;
};

export default SubTitle;
