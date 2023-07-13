import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { throttle } from 'lodash';

import NoResults from './NoResults';
import DeleteButton from './DeleteButton';

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
  border-top: 1px solid #dcdcdc;
`;
const FilterContainer = styled(FlexDiv)`
  position: absolute;
  top: -2.9375rem;
  column-gap: ${cssToken.SPACING['gap-50']};
`;

const Div = styled.div`
  height: 100vh;
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
              return post.courseId === -1 ? (
                <Div>로딩 중 </Div>
              ) : (
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
                  <DeleteButton postId={String(post.postId)} />
                  <CopyButton endpoint={`community/${post.postId}`} />
                  <ShareKakaoButton endpoint={`community/${post.postId}`} />
                </ContensCard>
              );
            })
          )}
      </CardWrapper>
      {communityData && <div ref={ref} />}
    </FilterWrapper>
  );
};

export default memo(FilterSection);
