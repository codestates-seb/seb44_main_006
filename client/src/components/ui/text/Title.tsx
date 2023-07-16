import { styled } from 'styled-components';
import { memo } from 'react';

import { Props, TextStyleT } from '../../../types/type';
import { TextStyle } from '../../../styles/styles';

const H1 = styled(TextStyle).attrs({ as: 'h1' })``;

const Title = ({
  children,
  styles,
}: {
  children: Props['children'];
  styles?: TextStyleT;
}) => {
  return <H1 {...styles}>{children}</H1>;
};

export default memo(Title);
