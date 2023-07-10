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
  CommunityListT,
  CommunitySummaryT,
  InfiniteScrollT,
} from '../../types/apitype';
import manufactureDate from '../../utils/manufactureDate';

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
  fetchNextPage: () => void;
}) => {
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const moveToDetail = (postId: number | undefined) => {
    if (postId) navigate(`/community/${postId}`);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <FilterWrapper>
      <FilterContainer>{children}</FilterContainer>
      <CardWrapper>
        {communityData &&
          communityData.map((datas: InfiniteScrollT) =>
            datas.communityListData.map((post: CommunitySummaryT) => (
              <ContensCard
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
