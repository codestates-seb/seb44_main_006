import { styled } from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef } from 'react';

import cssToken from '../../styles/cssToken';
import { FlexDiv, GapDiv } from '../../styles/styles';
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

const OutsideWrap = styled(FlexDiv)`
  margin-top: 77px;
  padding-top: ${cssToken.SPACING['px-50']};
  padding-left: ${cssToken.SPACING['py-100']};
  padding-right: ${cssToken.SPACING['py-100']};
  flex-direction: column;
  row-gap: ${cssToken.SPACING['gap-50']};
`;

const QuillDiv = styled(GapDiv)`
  margin-bottom: ${cssToken.SPACING['gap-50']};
`;

const PostCommunitypage = () => {
  const quillRef = useRef<ReactQuill>(null);
  const gotoBack = useMovePage('/community/select');
  const gotoNext = useMovePage('/community/post/id');

  const HandleBack = () => {
    // 뒤로 가겠냐 확인하고 문제 없을 경우
    gotoBack();
  };
  const HandleNext = () => {
    if (!quillRef?.current) return;
    const inputString = String(quillRef.current.value);
    const sanitizedValue: string = inputString
      .replace(/<\/?[^>]+(>|$)/g, '')
      .trim();

    if (sanitizedValue.length > 0) {
      gotoNext();
      return;
    }
    // content랑 태그 입력했다면
    quillRef.current.focus();
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
