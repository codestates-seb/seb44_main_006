import { styled } from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef } from 'react';

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

const QuillDiv = styled(GapDiv)`
  margin-bottom: ${cssToken.SPACING['gap-50']};
`;

const PostCommunitypage = () => {
  const quillRef = useRef<ReactQuill>(null);
  const gotoBack = useMovePage('/community/select');
  const gotoNext = useMovePage('/community/post/id');

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
    }
    // Todo 작성하신 내용이 삭제됩니다 모달 띄우기
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
      <PageMoveBtnDiv grayCallback={HandleBack} skyblueCallback={HandleNext} />
    </OutsideWrap>
  );
};

export default PostCommunitypage;
