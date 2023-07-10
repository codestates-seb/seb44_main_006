import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { LikeBookMarkButtonT } from '../../../types/type';
import { PostLike } from '../../../apis/api';

const LikeButton = ({
  svgWidth,
  svgHeight,
  isActive,
  courseId,
}: LikeBookMarkButtonT) => {
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation(PostLike, {
    // Fixme 키 추가하기
    onSuccess: () =>
      postId
        ? queryClient.invalidateQueries(['communityDetail'])
        : queryClient.invalidateQueries(['community']),
  });
  const handleLikeButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (courseId) mutation.mutate({ courseId });
  };
  return (
    <Button onClick={handleLikeButton}>
      <svg
        width={svgWidth || '23px'}
        height={svgHeight || '21px'}
        viewBox="0 0 23 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.25 20.6438L9.61875 19.1588C3.825 13.905 0 10.4288 0 6.1875C0 2.71125 2.7225 0 6.1875 0C8.145 0 10.0238 0.91125 11.25 2.34C12.4762 0.91125 14.355 0 16.3125 0C19.7775 0 22.5 2.71125 22.5 6.1875C22.5 10.4288 18.675 13.905 12.8812 19.1588L11.25 20.6438Z"
          fill={
            isActive ? cssToken.COLOR['red-900'] : cssToken.COLOR['gray-700']
          }
        />
      </svg>
    </Button>
  );
};

export default LikeButton;
