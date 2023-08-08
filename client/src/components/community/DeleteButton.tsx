import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import ModalChildren from './post/ModalChildren';

import Modal from '../ui/modal/Modal';
import { RootState } from '../../store';
import useToggleModal from '../../hooks/useToggleModal';
import { DeleteCommunityPost, DeleteMyPageCourses } from '../../apis/api';
import useMovePage from '../../hooks/useMovePage';
import EventButton from '../ui/button/EventButton';
import showToast from '../../utils/showToast';
import cssToken from '../../styles/cssToken';
import Trash from '../../assets/icons/Trash';

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
  const query = type ? DeleteMyPageCourses : DeleteCommunityPost;
  const mutate = useMutation(query, {
    onSuccess: async () => {
      showToast('success', '삭제 완료!')();
      toggleModal();
      await queryClient.invalidateQueries(['community']);
      await queryClient.invalidateQueries(['mypage']);
      await queryClient.invalidateQueries(['user']);
      goToPage();
    },
  });
  return (
    <>
      <EventButton
        styles={{
          fontsize: '13px',
        }}
        onClick={(e) => {
          e.stopPropagation();
          toggleModal();
        }}
      >
        <Trash style={{ iconWidth: 16, iconHeight: 18 }} />
      </EventButton>
      {modalIsOpen && (
        <Modal
          className={['modal', 'modalContainer']}
          backdropCallback={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            toggleModal();
          }}
          styles={{
            width: '25rem',
            height: '15rem',
            borderradius: `${cssToken.BORDER['rounded-s']}`,
          }}
        >
          <ModalChildren
            leftBtnCallback={(e) => {
              e.stopPropagation();
              mutate.mutate({ postId });
            }}
            rightBtnCallback={(e) => {
              e.stopPropagation();
              toggleModal();
            }}
            content="정말 삭제하시겠습니까?"
          />
        </Modal>
      )}
    </>
  );
};

export default DeleteButton;
