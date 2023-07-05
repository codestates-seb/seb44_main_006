import { styled } from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import cssToken from '../../styles/cssToken';
import { FlexDiv, GapDiv } from '../../styles/styles';
import KakaoMap from '../../components/map/KakaoMap';
import Marker from '../../components/map/Marker';
import Polyline from '../../components/map/Polyline';
import PageMoveBtnDiv from '../../components/community/PageMoveButton';
import {
  ExampleDescription,
  MyCourseBoast,
  WritePost,
} from '../../components/community/post/HEADzip';
import Warning from '../../components/community/post/Warning';
import TagContainer from '../../components/community/post/TagContainer';
import Title from '../../components/ui/text/Title';
import MapLocationCard from '../../components/ui/cards/MapLocationCard';

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

const ScheduleDiv = styled(FlexDiv)`
  flex-direction: column;
  overflow-y: scroll;
  flex: 1;
  margin-left: ${cssToken.SPACING['gap-24']};
  gap: ${cssToken.SPACING['gap-10']};
`;

const MapDiv = styled.div`
  flex: 3;
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
        <FlexDiv>
          <MapDiv>
            <KakaoMap width="100%" height="50vh">
              {array.map((pos, idx) => (
                <Marker key={idx} lat={pos.lat} lng={pos.lng} id={idx} />
              ))}
              <Polyline linePos={array} />
            </KakaoMap>
          </MapDiv>
          <ScheduleDiv>
            <Title styles={{ size: cssToken.TEXT_SIZE['text-24'] }}>
              제목이들어갈겁니다제목이들어갈겁니다제목이들어갈겁니다제목이들어갈겁니다제목이들어갈겁니다
            </Title>
            <div>
              {/* Todo 장소 길이 길어졌을 때 어떻게 처리할지 태그해야함 */}
              <MapLocationCard indexNum={1} location="this is red too" />
              <MapLocationCard indexNum={2} location="길막마전부타비켜" />
              <MapLocationCard indexNum={3} location="여긴어디나는누구" />
              <MapLocationCard
                indexNum={4}
                location="여름이었다가을이었다겨울이었다봄이었다여름이었다가을이었다겨"
              />
            </div>
          </ScheduleDiv>
        </FlexDiv>
      </GapDiv>
      <QuillDiv>
        <WritePost />
        <ReactQuill style={{ height: '200px' }} />
      </QuillDiv>
      <TagContainer />
      <Warning />
      <PageMoveBtnDiv
        backUrl="/community/select"
        nextUrl="/community/{post된게시글ID}"
      />
    </OutsideWrap>
  );
};

export default PostCommunitypage;
