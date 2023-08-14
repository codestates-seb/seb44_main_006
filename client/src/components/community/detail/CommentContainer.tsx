import { styled } from 'styled-components';

import { FlexDiv } from '../../../styles/styles';
import Comment from '../comment/Comment';
import manufactureDate from '../../../utils/manufactureDate';
import { CommentT } from '../../../types/apitype';

const CommentDiv = styled(FlexDiv)`
  flex-direction: column;
`;
const CommentContainer = ({ comments }: { comments: CommentT[] }) => {
  return (
    <CommentDiv>
      {comments.map((comment: CommentT) => (
        <Comment
          key={comment.answerId}
          answerId={comment.answerId}
          answererEmail={comment.answererEmail}
          answererImageUrl={comment.answererImageUrl}
          answererNickname={comment.answererNickname}
          answerUpdatedAt={manufactureDate(comment.answerUpdatedAt)}
          answerContent={comment.answerContent}
        />
      ))}
    </CommentDiv>
  );
};

export default CommentContainer;
