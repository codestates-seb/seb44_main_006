import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import InfoContainer from '../../components/community/detail/InfoContainer';
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
import { GetCommunityPost } from '../../apis/api';

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
  const { postId } = useParams<{ postId: string }>();
  const { data } = useQuery({
    queryKey: ['communitydetail'],
    queryFn: () => GetCommunityPost({ postId }),
    refetchOnWindowFocus: false,
  });

  console.log(data);

  const content =
    '<p>안녕하세요</p></br><h1>헤더입니다.</h1><p>안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요</p></br><h1>헤더입니다.</h1>';
  const tagArr = ['성심당', '세종수목원', '수료', '빨리', '하고싶다'];
  const destinationList = [
    {
      placeName: '오아시스 방탈출',
      placeUrl: 'http://place.map.kakao.com/848848018',
      roadAddressName: '서울 마포구 독막로9길 18',
      id: '848848018',
      phone: '010-5293-7612',
      categoryGroupCode: '',
      categoryGroupName: '',
      x: '126.63862968940775',
      y: '37.393063959939425',
    },
    {
      placeName: 'ESC방탈출카페 홍대점',
      placeUrl: 'http://place.map.kakao.com/1604855298',
      roadAddressName: '서울 마포구 서교동 364-4',
      id: '1604855298',
      phone: '02-336-8287',
      categoryGroupCode: 'CE7',
      categoryGroupName: '카페',
      x: '126.922525282682',
      y: '37.5518171346304',
    },
    {
      placeName: '큐브이스케이프 천호점',
      placeUrl: 'http://place.map.kakao.com/1857201893',
      roadAddressName: '서울 강동구 천호동 453-22',
      id: '1857201893',
      phone: '02-472-0808',
      categoryGroupCode: '',
      categoryGroupName: '',
      x: '127.127476994736',
      y: '37.5386479906941',
    },
    {
      placeName: '비밀의화원 미드나잇점',
      placeUrl: 'http://place.map.kakao.com/1811986888',
      roadAddressName: '서울 마포구 서교동 400-3',
      id: '1811986888',
      phone: '02-3144-6977',
      categoryGroupCode: 'CE7',
      categoryGroupName: '카페',
      x: '126.9190709205069',
      y: '37.54912083301454',
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

      <MapContainer destinationList={destinationList} title="hihi" />

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
      {/* <CommentContainer comments={commentArr} /> */}
      <PageMoveButton />
    </OutsideWrap>
  );
};

export default DetailPage;
