import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { styled } from 'styled-components';

import ModalChildren from './post/ModalChildren';

import Modal from '../ui/modal/Modal';
import { RootState } from '../../store';
import useToggleModal from '../../hooks/useToggleModal';
import { DeleteCommunityPost } from '../../apis/api';
import useMovePage from '../../hooks/useMovePage';

const Button = styled.button`
  cursor: pointer;
`;

const DeleteButton = ({
  type,
  postId,
}: {
  type?: 'mypage';
  postId: string;
}) => {
  const url = type ? '/mypage' : '/community';
  const goToPage = useMovePage(url);
  const modalIsOpen = useSelector((state: RootState) => state.overlay.isOpen);
  const toggleModal = useToggleModal();
  const queryClient = useQueryClient();
  const query = type ? DeleteCommunityPost : DeleteCommunityPost;
  // 23번째 라인 왼쪽에 마이페이지 딜리트 함수 넣으시면 됩니다.
  const mutate = useMutation(query, {
    onSuccess: async () => {
      toggleModal();
      await queryClient.invalidateQueries(['community']);
      await queryClient.invalidateQueries(['mypage']);
      goToPage();
    },
  });
  return (
    <>
      <Button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleModal();
        }}
      >
        삭제
      </Button>
      {modalIsOpen && (
        <Modal
          styles={{
            width: '47.0625rem',
            height: '28.375rem',
          }}
        >
          <ModalChildren
            leftBtnCallback={(e) => {
              e.stopPropagation();

              toggleModal();
            }}
            rightBtnCallback={(e) => {
              e.stopPropagation();
              mutate.mutate({ postId });
            }}
            content="정말 삭제하시겠습니까?"
          />
        </Modal>
      )}
    </>
  );
};

export default DeleteButton;
