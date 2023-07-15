import { styled } from 'styled-components';

import { Props, TextStyleT } from '../../../types/type';
import { TextStyle } from '../../../styles/styles';

const P = styled(TextStyle).attrs({ as: 'p' })`
  display: flex;
  align-items: center;
  word-break: break-word;
  line-height: 2.5rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
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
