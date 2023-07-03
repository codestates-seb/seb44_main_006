import { styled } from 'styled-components';

import { Props, TextStyleT } from '../../../types/type';
import { TextStyle } from '../../../styles/styles';

const H3 = styled(TextStyle)``;

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
