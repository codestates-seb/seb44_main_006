import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import ContensCard from '../ui/cards/ContentsCard';
import cssToken from '../../styles/cssToken';
import { CardWrapper, FlexDiv } from '../../styles/styles';
import { Props } from '../../types/type';
import {
  CommunityListT,
  CommunitySummaryT,
  PageInfoT,
} from '../../types/apitype';

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
  communityData: CommunityListT;
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
          communityData.data.map((post: CommunitySummaryT) => (
            <ContensCard
              title={post.courseTitle}
              text={post.postContent}
              likeCount={post.courseLikeCount}
              tag={post.tags}
              userName={post.memberNickname}
              thumbnail={post.courseThumbnail}
              onClick={moveToDetail}
              id={post.postId}
            />
          ))}
      </CardWrapper>
      <div ref={ref} />
    </FilterWrapper>
  );
};

export default FilterSection;
