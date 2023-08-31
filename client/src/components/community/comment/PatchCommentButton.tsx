import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from './styles';

import { PatchComment } from '../../../apis/api';

const PatchCommentButton = ({
  previousComment,
  newComment,
  commentId,
  setEditing,
}: {
  previousComment: string;
  newComment: string;
  commentId: number | undefined;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();

  const patchMutation = useMutation(PatchComment, {
    onSuccess: () => queryClient.invalidateQueries(['communityDetail']),
  });

  const isSatisfiedPatchCommentConditions = () => {
    return newComment !== previousComment && newComment.trim().length > 0;
  };

  const handlePatchComment = () => {
    if (isSatisfiedPatchCommentConditions()) {
      if (commentId)
        patchMutation.mutate({
          commentId,
          answerContent: newComment,
        });
    }
    setEditing(false);
  };

  return <Button onClick={handlePatchComment}>수정완료</Button>;
};

export default PatchCommentButton;
