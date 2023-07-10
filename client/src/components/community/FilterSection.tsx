import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import DeleteButton from './DeleteButton';

import ContensCard from '../ui/cards/ContentsCard';
import cssToken from '../../styles/cssToken';
import { CardWrapper, FlexDiv } from '../../styles/styles';
import { Props } from '../../types/type';
import { CommunityListT, CommunitySummaryT } from '../../types/apitype';

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
}: {
  children: Props['children'];
  communityData: { data: CommunityListT };
}) => {
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const moveToDetail = (id: number | undefined) => {
    if (id) navigate(`/community/${id}`);
  };

  return (
    <FilterWrapper>
      <FilterContainer>{children}</FilterContainer>
      <CardWrapper>
        {communityData &&
          communityData.data.data.map((post: CommunitySummaryT) => (
            <ContensCard
              title={post.courseTitle}
              text={post.postContent}
              likeCount={post.courseLikeCount}
              tag={post.tags}
              userName={post.memberNickname}
              thumbnail={post.courseThumbnail}
              onClick={moveToDetail}
              id={post.postId}
            >
              {/* Todo 작성자만 보이도록해야함 */}
              <DeleteButton postId={String(post.postId)} />
            </ContensCard>
          ))}
      </CardWrapper>
      <div ref={ref} />
    </FilterWrapper>
  );
};

export default FilterSection;
