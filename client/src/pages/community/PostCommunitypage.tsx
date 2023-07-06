import { styled } from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import cssToken from '../../styles/cssToken';
import { GapDiv, OutsideWrap } from '../../styles/styles';
import PageMoveBtnDiv from '../../components/community/PageMoveButton';
import {
  ExampleDescription,
  MyCourseBoast,
  WritePost,
} from '../../components/community/post/DescriptionZip';
import Warning from '../../components/community/post/Warning';
import TagContainer from '../../components/community/post/TagContainer';
import useMovePage from '../../hooks/useMovePage';
import MapContainer from '../../components/community/MapContainer';
import Modal from '../../components/ui/modal/Modal';
import { overlayActions } from '../../store/overlay-slice';
import { RootState } from '../../store';
import ModalChildren from '../../components/community/post/ModalChildren';

const QuillDiv = styled(GapDiv)`
  margin-bottom: ${cssToken.SPACING['gap-50']};
`;

const PostCommunitypage = () => {
  const quillRef = useRef<ReactQuill>(null);
  const gotoBack = useMovePage('/community/select');
  const gotoNext = useMovePage('/community/post/id');
  const modalIsOpen = useSelector((state: RootState) => state.overlay.isOpen);
  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(overlayActions.toggleOverlay());
  };
  const isEditorEmpty = () => {
    const inputString = String(quillRef.current?.value);
    const sanitizedValue: string = inputString
      .replace(/<\/?[^>]+(>|$)/g, '')
      .trim();
    return sanitizedValue.length === 0;
  };
  const HandleBack = () => {
    if (isEditorEmpty()) {
      gotoBack();
      return;
    }
    toggleModal();
  };
  const HandleNext = () => {
    if (!isEditorEmpty()) {
      gotoNext();
      return;
    }
    quillRef.current?.focus();
  };
  const goToback = () => {
    gotoBack();
    toggleModal();
  };
  const array = [
    { lat: 33.450701, lng: 126.570667 },
    { lat: 33.450701, lng: 126.570867 },
    { lat: 33.450601, lng: 126.570367 },
  ];

  return (
    <>
      <OutsideWrap>
        <MyCourseBoast />
        <GapDiv>
          <ExampleDescription />
          <MapContainer array={array} />
        </GapDiv>
        <QuillDiv>
          <WritePost />
          <ReactQuill ref={quillRef} style={{ height: '200px' }} />
        </QuillDiv>
        <TagContainer />
        <Warning />
        <PageMoveBtnDiv
          grayCallback={HandleBack}
          skyblueCallback={HandleNext}
        />
      </OutsideWrap>
      {modalIsOpen && (
        <Modal
          backdropCallback={toggleModal}
          handleCloseBtn={toggleModal}
          styles={{
            width: '47.0625rem',
            height: '28.375rem',
          }}
        >
          <ModalChildren toggleModal={toggleModal} gotoBack={goToback} />
        </Modal>
      )}
    </>
  );
};

export default PostCommunitypage;
