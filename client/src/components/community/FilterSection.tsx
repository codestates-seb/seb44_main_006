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
import Noresult from '../ui/Noresult';
import shareKakao from '../../utils/shareKakao';
import ShareKakaoButton from '../ui/button/ShareKakaoButton';
import CopyButton from '../ui/button/CopyButton';

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
      {communityData[0].communityListData.length === 0 && (
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
                {userData && userData.memberEmail === post.memberEmail && (
                  <DeleteButton postId={String(post.postId)} />
                )}
                <CopyButton endpoint={`community/${post.postId}`} />
                <ShareKakaoButton endpoint={`community/${post.postId}`} />
              </ContensCard>
            ))
          )}
      </CardWrapper>
      <div ref={ref} />
    </FilterWrapper>
  );
};

export default FilterSection;
