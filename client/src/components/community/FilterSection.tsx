import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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
import useUserInfo from '../../hooks/useUserInfo';

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
  communityData,
  fetchNextPage,
  hasNextPage,
}: {
  children: Props['children'];
  communityData: InfiniteScrollT[];
  hasNextPage: undefined | boolean;
  fetchNextPage: FetchNextPageT;
}) => {
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  // Todo 작성자 삭제, 좋아요 버튼 안보이게 하기
  const { userData } = useUserInfo();
  const moveToDetail = (postId: number | undefined) => {
    if (postId) navigate(`/community/${postId}`);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage().catch((error) => console.log(error));
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <FilterWrapper>
      <FilterContainer>{children}</FilterContainer>
      <CardWrapper>
        {communityData[0].communityListData.length === 0 && (
          <p>검색결과가 없습니다.</p>
        )}
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
                date={manufactureDate(post.postCreatedAt)}
              >
                {/* Todo 작성자만 보이도록해야함 */}
                <DeleteButton postId={String(post.postId)} />
              </ContensCard>
            ))
          )}
      </CardWrapper>
      <div ref={ref} />
    </FilterWrapper>
  );
};

export default FilterSection;
