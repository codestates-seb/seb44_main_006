import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { throttle } from 'lodash';

import ContensCard from '../ui/cards/ContentsCard';
import cssToken from '../../styles/cssToken';
import { CardWrapper, FlexDiv } from '../../styles/styles';
import { Props } from '../../types/type';
import {
  CommunitySummaryT,
  FetchNextPageT,
  InfiniteScrollT,
} from '../../types/apitype';
import manufactureDate from '../../utils/manufactureDate';
import useUserInfo from '../../querys/useUserInfo';
import Noresult from '../ui/Noresult';
import ShareKakaoButton from '../ui/button/ShareKakaoButton';
import CopyButton from '../ui/button/CopyButton';
import { RootState } from '../../store';

const FilterWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${cssToken.SPACING['gap-50']};
  border-top: 1px solid #dcdcdc;
`;
const FilterContainer = styled(FlexDiv)`
  position: absolute;
  top: -2.9375rem;
  column-gap: ${cssToken.SPACING['gap-50']};
`;

const FilterSection = ({
  children,
  fetchNextPage,
  hasNextPage,
}: {
  children: Props['children'];
  hasNextPage: undefined | boolean;
  fetchNextPage: FetchNextPageT;
}) => {
  const [ref, inView] = useInView();
  const { userData } = useUserInfo();
  const communityData = useSelector(
    (state: RootState) => state.communityBasic.communityList
  );
  const navigate = useNavigate();
  const moveToDetail = (postId: number | undefined) => {
    if (postId) navigate(`/community/${postId}`);
  };

  const fetcNexthData = throttle(() => {
    fetchNextPage().catch((error) => {
      throw error;
    });
  }, 500);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetcNexthData();
    }
  }, [fetcNexthData, hasNextPage, inView]);
  return (
    <>
      <FilterWrapper>
        <FilterContainer>{children}</FilterContainer>
        {!communityData && <p>로딩중</p>}
        {communityData && communityData[0].communityListData.length === 0 && (
          <Noresult
            iconHeight={100}
            iconWidth={100}
            size={cssToken.TEXT_SIZE['text-40']}
          />
        )}
        <CardWrapper>
          {communityData &&
            communityData.map((datas: InfiniteScrollT) =>
              datas.communityListData.map((post: CommunitySummaryT) => (
                <ContensCard
                  key={post.courseId}
                  type="post"
                  title={post.courseTitle}
                  text={post.postContent}
                  likeCount={post.courseLikeCount}
                  tag={post.tags}
                  userName={post.memberNickname}
                  thumbnail={post.courseThumbnail}
                  onClick={moveToDetail}
                  postId={post.postId}
                  courseId={post.courseId}
                  likeStatus={post.likeStatus}
                  bookmarkStatus={post.bookmarkStatus}
                  isMine={userData?.memberEmail === post.memberEmail}
                  date={manufactureDate(post.postCreatedAt)}
                >
                  <CopyButton endpoint={`community/${post.postId}`} />
                  <ShareKakaoButton endpoint={`community/${post.postId}`} />
                </ContensCard>
              ))
            )}
        </CardWrapper>
      </FilterWrapper>
      {communityData && <div ref={ref} />}
    </>
  );
};

export default FilterSection;
