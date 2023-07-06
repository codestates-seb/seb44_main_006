import { styled } from 'styled-components';

import InfoContainer from './InfoContainer';

import UserInfoMy from '../../components/ui/UserInfoPfp';
import Title from '../../components/ui/text/Title';
import cssToken from '../../styles/cssToken';
import { FlexDiv, OutsideWrap } from '../../styles/styles';
import MapContainer from '../../components/community/MapContainer';
import TextArea from '../../components/ui/input/TextArea';
import SkyBlueButton from '../../components/ui/button/SkyBlueButton';
import PageMoveButton from '../../components/community/detail/PageMoveButton';
import CommentContainer from '../../components/community/detail/CommentContainer';
import LikeStarButtonContainer from '../../components/community/detail/LikeStarButtonContainer';
import TagContainer from '../../components/community/detail/TagContainer';

const HEADDiv = styled(FlexDiv)`
  justify-content: space-between;
`;

const UersDiv = styled(FlexDiv)`
  align-items: center;
  column-gap: ${cssToken.SPACING['gap-24']};
`;

const ContentDiv = styled(FlexDiv)`
  flex-direction: column;
  row-gap: ${cssToken.SPACING['gap-24']};
  width: 100%;
`;

const CommentBtn = styled(FlexDiv)`
  justify-content: flex-end;
`;

const DetailPage = () => {
  const content =
    '<p>안녕하세요</p></br><h1>헤더입니다.</h1><p>안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요</p></br><h1>헤더입니다.</h1>';
  const tagArr = ['성심당', '세종수목원', '수료', '빨리', '하고싶다'];
  const array = [
    { lat: 33.450701, lng: 126.570667 },
    { lat: 33.450701, lng: 126.570867 },
    { lat: 33.450601, lng: 126.570367 },
  ];
  const commentArr = [
    {
      src: 'https://product.cdn.cevaws.com/var/storage/images/_aliases/reference/media/feliway-2017/images/kor-kr/1_gnetb-7sfmbx49emluey4a/6341829-1-kor-KR/1_gNETb-7SfMBX49EMLUeY4A.jpg',
      nickName: '1',
      date: '23.06.29',
      content:
        '미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당    미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당미쳤당',
    },
    {
      src: 'https://product.cdn.cevaws.com/var/storage/images/_aliases/reference/media/feliway-2017/images/kor-kr/1_gnetb-7sfmbx49emluey4a/6341829-1-kor-KR/1_gNETb-7SfMBX49EMLUeY4A.jpg',
      nickName: '2',
      date: '23.06.29',
      content: '가고싶당',
    },
    {
      src: 'https://product.cdn.cevaws.com/var/storage/images/_aliases/reference/media/feliway-2017/images/kor-kr/1_gnetb-7sfmbx49emluey4a/6341829-1-kor-KR/1_gNETb-7SfMBX49EMLUeY4A.jpg',
      nickName: '2',
      date: '23.06.29',
      content: '가고싶당',
    },
    {
      src: 'https://product.cdn.cevaws.com/var/storage/images/_aliases/reference/media/feliway-2017/images/kor-kr/1_gnetb-7sfmbx49emluey4a/6341829-1-kor-KR/1_gNETb-7SfMBX49EMLUeY4A.jpg',
      nickName: '2',
      date: '23.06.29',
      content: '가고싶당',
    },
  ];
  return (
    <OutsideWrap>
      <Title styles={{ size: cssToken.TEXT_SIZE['text-40'] }}>
        나의 코스 자랑하기
      </Title>

      <HEADDiv>
        <UersDiv>
          <UserInfoMy src="https://product.cdn.cevaws.com/var/storage/images/_aliases/reference/media/feliway-2017/images/kor-kr/1_gnetb-7sfmbx49emluey4a/6341829-1-kor-KR/1_gNETb-7SfMBX49EMLUeY4A.jpg" />
          <InfoContainer writer="히히" date="23.06.29" />
        </UersDiv>
        {/* Todo 로그인 유저에게만 보이도록 */}
        <LikeStarButtonContainer LikeCount={130} isCheck />
      </HEADDiv>

      <MapContainer array={array} />

      <ContentDiv>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <TagContainer tagArr={tagArr} />
      </ContentDiv>

      {/* Todo 로그인 여부에 따라 Placeholder Ment 변경, button disabled */}
      <form>
        <TextArea
          description="댓글을 작성해주세요."
          styles={{ width: '100%' }}
        />
        {/* TODO button type지정? */}
        <CommentBtn>
          <SkyBlueButton
            width="13.875rem"
            height="3.3125rem"
            borderRadius={cssToken.BORDER['rounded-md']}
            disabled="false"
          >
            작성하기
          </SkyBlueButton>
        </CommentBtn>
      </form>
      <CommentContainer comments={commentArr} />
      <PageMoveButton />
    </OutsideWrap>
  );
};

export default DetailPage;
