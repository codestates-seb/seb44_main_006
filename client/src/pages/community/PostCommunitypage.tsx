import { styled } from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import cssToken from '../../styles/cssToken';
import { FlexDiv, GapDiv } from '../../styles/styles';
import KakaoMap from '../../components/map/KakaoMap';
import Marker from '../../components/map/Marker';
import Polyline from '../../components/map/Polyline';
import Btn from '../../components/community/Btn';
import {
  ExampleDescription,
  MyCourseBoast,
  WritePost,
} from '../../components/community/post/HEADzip';
import Warning from '../../components/community/post/Warning';
import TagContainer from '../../components/community/post/TagContainer';

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
        <KakaoMap width="100%" height="50vh">
          {array.map((pos, idx) => (
            <Marker key={idx} lat={pos.lat} lng={pos.lng} id={idx} />
          ))}
          <Polyline linePos={array} />
        </KakaoMap>
      </GapDiv>
      <QuillDiv>
        <WritePost />
        <ReactQuill style={{ height: '200px' }} />
      </QuillDiv>
      <TagContainer />
      <Warning />
      <Btn backUrl="/community/select" nextUrl="/community/{post된게시글ID}" />
    </OutsideWrap>
  );
};

export default PostCommunitypage;
