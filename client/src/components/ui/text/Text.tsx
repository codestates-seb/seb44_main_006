import { styled } from 'styled-components';

import { Props, TextStyleT } from '../../../types/type';
import cssToken from '../../../styles/cssToken';

const P = styled.p<TextStyleT>`
  //Todo 멘토님에게 styles 코드 겹치는 거 어떻게 해결할지
  display: flex;
  align-items: center;
  font-size: ${(props) => (props.size ? props.size : '1rem')};
  color: ${(props) => (props.color ? props.color : 'black')};
  font-weight: ${(props) =>
    props.weight ? props.weight : cssToken.FONT_WEIGHT.medium};
`;

const Text = ({
  children,
  styles,
}: {
  children: Props['children'];
  styles?: TextStyleT;
}) => {
  return <P {...styles}>{children}</P>;
};

export default Text;
