import { styled } from 'styled-components';

import { FlexDiv } from '../../../styles/styles';
import Comment from '../Comment';
import { CommentT } from '../../../types/type';

const CommentDiv = styled(FlexDiv)`
  flex-direction: column;
`;

const CommentContainer = ({ comments }: { comments: CommentT[] }) => {
  return (
    <CommentDiv>
      {comments.map((comment) => (
        <Comment
          src={comment.src}
          nickName={comment.nickName}
          date={comment.date}
          content={comment.content}
        />
      ))}
    </CommentDiv>
  );
};

export default CommentContainer;
