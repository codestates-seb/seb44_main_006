import { memo } from 'react';
import { styled } from 'styled-components';

import cssToken from '../../../styles/cssToken';

const Div = styled.div`
  @media screen and (max-height: 768px) {
    font-size: ${cssToken.TEXT_SIZE['text-14']};
  }
`;

const Content = ({ postContent }: { postContent: string }) => {
  return <Div dangerouslySetInnerHTML={{ __html: postContent }} />;
};

export default memo(Content);
