import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { throttle } from 'lodash';

import NoResults from './NoResults';
import DeleteButton from './DeleteButton';
import SkeletonCardContainer from './skeleton/SkeletonCardContainer';

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
`;
const FilterContainer = styled(FlexDiv)`
  position: absolute;
  top: -2.9375rem;
  column-gap: ${cssToken.SPACING['gap-50']};
  width: ${cssToken.WIDTH['w-full']};
  border-bottom: 1px solid ${cssToken.COLOR['gray-600']};
  justify-content: center;
`;

const FilterSection = ({
  children,
  fetchNextPage,
  hasNextPage,
  isFetching,
}: {
  children: Props['children'];
  hasNextPage: undefined | boolean;
  fetchNextPage: FetchNextPageT;
  isFetching: boolean;
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
  }, 1000);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetcNexthData();
    }
  }, [inView, hasNextPage, fetcNexthData]);

  return (
    <FilterWrapper>
      <FilterContainer>{children}</FilterContainer>
      {communityData && communityData[0].communityListData.length === 0 && (
        <NoResults />
      )}
      <CardWrapper>
        {communityData &&
          communityData.map((datas: InfiniteScrollT) =>
            datas.communityListData.map((post: CommunitySummaryT) => {
              if (post.courseId !== -1)
                return (
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
                    {userData && userData?.memberEmail === post.memberEmail && (
                      <DeleteButton postId={String(post.postId)} />
                    )}
                    <CopyButton endpoint={`community/${post.postId}`} />
                    <ShareKakaoButton endpoint={`community/${post.postId}`} />
                  </ContensCard>
                );
              return <SkeletonCardContainer length={6} />;
            })
          )}
        {isFetching && <SkeletonCardContainer length={6} />}
      </CardWrapper>
      {communityData && <div ref={ref} />}
    </FilterWrapper>
  );
};

export default memo(FilterSection);
