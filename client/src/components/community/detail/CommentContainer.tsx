import { styled } from 'styled-components';

import { FlexDiv } from '../../../styles/styles';
import Comment from '../Comment';
import { CommentT } from '../../../types/type';
import manufactureDate from '../../../utils/manufactureDate';

const CommentDiv = styled(FlexDiv)`
  flex-direction: column;
`;
// Todo 댓글 수정 삭제하기
const CommentContainer = ({ comments }: { comments: CommentT[] }) => {
  return (
    <CommentDiv>
      {comments.map((comment: CommentT) => (
        <Comment
          key={comment.answerId}
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
