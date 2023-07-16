import { useMutation, useQueryClient } from '@tanstack/react-query';
import { debounce } from 'lodash';

import EventButton from './EventButton';

import cssToken from '../../../styles/cssToken';
import { LikeBookMarkButtonT } from '../../../types/type';
import { PostBookmark } from '../../../apis/api';
import showToast from '../../../utils/showToast';

const StarButton = ({
  status,
  width,
  height,
  svgWidth,
  svgHeight,
  isActive,
  courseId,
  className,
}: LikeBookMarkButtonT) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(PostBookmark, {
    onSuccess: async () => {
      if (status === 'add')
        showToast('default', '마이페이지에 추가됐습니다.')();
      else showToast('default', '마이페이지에서 삭제했습니다.')();
      await queryClient.invalidateQueries(['community']);
      await queryClient.invalidateQueries(['communityDetail']);
      await queryClient.invalidateQueries(['mypage']);
      await queryClient.invalidateQueries(['user']);
    },
  });

  const PushStar = debounce(() => {
    mutation.mutate({ courseId });
  }, 300);

  const handleStarButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (courseId) PushStar();
  };
  return (
    <EventButton
      className={className}
      onClick={handleStarButton}
      styles={{
        width,
        height,
        bgcolor: isActive
          ? cssToken.COLOR['yellow-100']
          : cssToken.COLOR['gray-300'],
        brradius: cssToken.BORDER['rounded-full'],
      }}
    >
      <svg
        width={svgWidth || '20px'}
        height={svgHeight || '20px'}
        viewBox="0 0 27 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 21.7742L20.0473 25.7642C21.2463 26.4955 22.7136 25.4145 22.398 24.0474L20.6626 16.5443L26.4526 11.4892C27.5097 10.5672 26.9417 8.81858 25.5534 8.7073L17.9332 8.05555L14.9515 0.965712C14.415 -0.321904 12.585 -0.321904 12.0485 0.965712L9.06676 8.03965L1.44665 8.69141C0.0583065 8.80268 -0.509653 10.5513 0.547382 11.4733L6.33741 16.5284L4.60198 24.0315C4.28645 25.3986 5.75367 26.4796 6.9527 25.7483L13.5 21.7742Z"
          fill={
            isActive ? cssToken.COLOR['yellow-900'] : cssToken.COLOR['gray-700']
          }
        />
      </svg>
    </EventButton>
  );
};

export default StarButton;
