import { useMutation, useQueryClient } from '@tanstack/react-query';
import { debounce } from 'lodash';

import EventButton from './EventButton';

import cssToken from '../../../styles/cssToken';
import { LikeBookMarkButtonT } from '../../../types/type';
import { PostLike } from '../../../apis/api';
import showToast from '../../../utils/showToast';

const LikeButton = ({
  svgWidth,
  svgHeight,
  isActive,
  courseId,
  impossible,
  isMine,
}: LikeBookMarkButtonT) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(PostLike, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['community']);
      await queryClient.invalidateQueries(['communityDetail']);
      await queryClient.invalidateQueries(['mypage']);
    },
  });

  const PushLike = debounce(() => {
    mutation.mutate({ courseId });
  }, 300);

  const handleLikeButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (impossible) {
      showToast('error', '로그인 후 이용해주세요.')();
      return;
    }
    if (isMine) {
      showToast('error', '다른 사람 글에 좋아요를 눌러주세요.')();
      return;
    }
    if (courseId) PushLike();
  };
  return (
    <EventButton className="like" onClick={handleLikeButton}>
      <svg
        width={svgWidth || '18px'}
        height={svgHeight || '18px'}
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
    </EventButton>
  );
};

export default LikeButton;
