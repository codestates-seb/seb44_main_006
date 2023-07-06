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
import Text from '../../components/ui/text/Text';
import GrayButton from '../../components/ui/button/GrayButton';
import SkyBlueButton from '../../components/ui/button/SkyBlueButton';

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
    // Todo 작성하신 내용이 삭제됩니다 모달 띄우기
    toggleModal();
  };
  const HandleNext = () => {
    if (!isEditorEmpty()) {
      gotoNext();
      return;
    }
    quillRef.current?.focus();
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
        <Modal>
          <Text>작성하신 내용이 사라집니다.</Text>
          {/* 모달닫기 */}
          <GrayButton onClick={toggleModal}>아니오</GrayButton>
          {/* 뒤로가기 */}
          <SkyBlueButton>예</SkyBlueButton>
        </Modal>
      )}
    </>
  );
};

export default PostCommunitypage;
