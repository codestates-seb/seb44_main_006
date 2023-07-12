import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
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

const DeleteButton = ({ postId }: { postId: string }) => {
  const goToCommunity = useMovePage('/community');
  const modalIsOpen = useSelector((state: RootState) => state.overlay.isOpen);
  const toggleModal = useToggleModal();
  const mutate = useMutation(DeleteCommunityPost, {
    onSuccess() {
      // Todo 다른 페이지 refetch 해야할 수도?
      toggleModal();
      goToCommunity();
    },
  });
  return (
    <>
      <Button
        type="button"
        onClick={() => {
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
            leftBtnCallback={() => {
              toggleModal();
            }}
            rightBtnCallback={() => {
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
