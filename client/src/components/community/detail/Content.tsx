import { memo } from 'react';
import { styled } from 'styled-components';

import cssToken from '../../../styles/cssToken';

const Div = styled.div`
  ul {
    list-style-type: disc;
    padding-inline-start: ${cssToken.SPACING['gap-20']};
  }
  ol {
    list-style-type: decimal;
    padding-inline-start: ${cssToken.SPACING['gap-20']};
  }

  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }

  &.content {
    display: flex;
    flex-direction: column;
    row-gap: ${cssToken.SPACING['gap-10']};
  }
  @media screen and (max-height: 768px) {
    font-size: ${cssToken.TEXT_SIZE['text-14']};
    p,
    strong,
    em,
    u,
    s,
    li {
      font-size: ${cssToken.TEXT_SIZE['text-14']};
    }
  }
`;

const Content = ({ postContent }: { postContent: string }) => {
  return (
    <Div
      className="content"
      dangerouslySetInnerHTML={{ __html: postContent }}
    />
  );
};

export default memo(Content);
