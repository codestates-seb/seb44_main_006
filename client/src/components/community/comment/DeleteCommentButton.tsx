import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from './styles';

import { DeleteComment } from '../../../apis/api';

const DeleteCommentButton = ({
  commentId,
}: {
  commentId: number | undefined;
}) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(DeleteComment, {
    onSuccess: () => queryClient.invalidateQueries(['communityDetail']),
  });
  const handleDeleteComment = () => {
    if (commentId) deleteMutation.mutate({ commentId });
  };
  return <Button onClick={handleDeleteComment}>삭제</Button>;
};

export default DeleteCommentButton;
