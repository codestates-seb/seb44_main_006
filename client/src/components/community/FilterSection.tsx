import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { throttle } from 'lodash';
import { AxiosError } from 'axios';

import NoResults from './NoResults';
import DeleteButton from './DeleteButton';
import SkeletonCardContainer from './skeleton/SkeletonCardContainer';
import FilterTabDiv from './FilterTabDiv';

import { ContensCard } from '../ui/cards/index';
import cssToken from '../../styles/cssToken';
import { CardWrapper } from '../../styles/styles';
import { CommunitySummaryT, InfiniteScrollT } from '../../types/apitype';
import manufactureDate from '../../utils/manufactureDate';
import useUserInfo from '../../querys/useUserInfo';
import { RootState } from '../../store';
import thousandTok from '../../utils/thousandTok';
import useInfiniteScrollQuery from '../../hooks/useInfiniteQuery';
import { LIMIT } from '../../utils/constant/constant';
import ShareKakaoButton from '../ui/button/ShareKakaoButton';
import CopyButton from '../ui/button/CopyButton';

const FilterWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${cssToken.SPACING['gap-50']};
  padding-top: 0px;
  @media screen and (max-width: 768px) {
    padding: ${cssToken.SPACING['gap-20']};
    padding-top: 0px;
  }
`;

// Todo 이전 데이터 리렌더링 방지하기
const FilterSection = () => {
  const [ref, inView] = useInView();
  const scrollCnt = useRef<number>(0);
  const navigate = useNavigate();
  // const [prevData, setPrevData] = useState<[]>();
  const selectedTab = useSelector(
    (state: RootState) => state.communityBasic.selectedTab
  );
  const tagName = useSelector(
    (state: RootState) => state.communityBasic.searchKeyword
  );
  const { userData } = useUserInfo();
  const {
    data: communityData,
    fetchNextPage,
    hasNextPage,
    error,
    isFetchingNextPage,
  } = useInfiniteScrollQuery({
    limit: LIMIT,
    tagName: tagName || '',
    sort: selectedTab,
  });

  if (error) {
    const { response } = error as AxiosError;
    if (response) {
      navigate('/error', {
        state: {
          status: response.status,
          errormsg: response.statusText,
        },
      });
    }
  }

  const moveToDetail = (postId: number | undefined) => {
    if (postId) navigate(`/community/${postId}`);
  };

  const fetcNexthData = throttle(() => {
    fetchNextPage().catch((err) => {
      throw err;
    });
  }, 1000);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetcNexthData();
      scrollCnt.current += 1;
    }
  }, [inView, hasNextPage, fetcNexthData]);

  return (
    <FilterWrapper>
      <FilterTabDiv />
      {communityData &&
        communityData.pages[0].communityListData.length === 0 && <NoResults />}
      <CardWrapper>
        {!communityData && <SkeletonCardContainer length={6} />}
        {communityData &&
          communityData.pages.map((datas: InfiniteScrollT) =>
            datas.communityListData.map((post: CommunitySummaryT) => {
              if (post.courseId !== -1)
                return (
                  <ContensCard
                    key={post.courseId}
                    type="post"
                    title={post.courseTitle}
                    text={post.postContent}
                    likeCount={thousandTok(post.courseLikeCount)}
                    tag={post.tags}
                    userName={post.memberNickname}
                    thumbnail={post.courseThumbnail}
                    onClick={moveToDetail}
                    postId={post.postId}
                    courseId={post.courseId}
                    likeStatus={post.likeStatus}
                    bookmarkStatus={post.bookmarkStatus}
                    answerCount={post.answerCount}
                    courseViewCount={post.courseViewCount}
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
        {isFetchingNextPage && <SkeletonCardContainer length={6} />}
      </CardWrapper>
      {communityData && <div ref={ref} />}
    </FilterWrapper>
  );
};

export default memo(FilterSection);
