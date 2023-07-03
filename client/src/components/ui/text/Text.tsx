import { styled } from 'styled-components';

import { Props, TextStyleT } from '../../../types/type';

const P = styled.p<TextStyleT>`
  //Todo 멘토님에게 styles 코드 겹치는 거 어떻게 해결할지
  font-size: ${(props) => (props.size ? props.size : '1rem')};
  color: ${(props) => (props.color ? props.color : 'black')};
  font-weight: ${(props) => (props.weight ? props.weight : 'Medium')};
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
