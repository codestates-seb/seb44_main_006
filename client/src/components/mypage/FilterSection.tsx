import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ContensCard from '../ui/cards/ContentsCard';
import cssToken from '../../styles/cssToken';
import { CardWrapper, FlexDiv } from '../../styles/styles';
import { Props } from '../../types/type';
import { MypCourseSummaryT, MyBookMarkSummaryT } from '../../types/apitype';
import manufactureDate from '../../utils/manufactureDate';
import useUserInfo from '../../hooks/useUserInfo';
import Noresult from '../ui/Noresult';
import ShareKakaoButton from '../ui/button/ShareKakaoButton';
import CopyButton from '../ui/button/CopyButton';
import Text from '../ui/text/Text';
import { RootState } from '../../store';
import { useEffect } from 'react';

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

const CounterContainer = styled.div`
  width: ${cssToken.WIDTH['w-full']};
  padding-bottom: 1.875rem;
`;

const FilterSection = ({
  children,
  memberCourseList,
  memberBookmarkedList,
  selectTab,
}: {
  children?: Props['children'];
  memberCourseList?: MypCourseSummaryT[];
  memberBookmarkedList?: MyBookMarkSummaryT[];
  selectTab?: string | undefined;
}) => {
  const navigate = useNavigate();
  const [ref] = useInView();
  const { userData } = useUserInfo();
  const moveToDetail = (postId: number | undefined) => {
    if (postId !== undefined) navigate(`/community/${postId}`);
    console.log('postId');
  };
  // const communityData = useSelector(
  //   (state: RootState) => state.communityBasic.communityList
  // );

  const BookmarkCount: number = userData?.myBookmarkCount;
  const myCourseCount: number = userData?.myCourseCount;

  useEffect(() => {

  }, [memberCourseList, memberBookmarkedList])
  console.log(memberBookmarkedList);

  return (
    <FilterWrapper>
      <FilterContainer>{children}</FilterContainer>
      {(memberCourseList || memberBookmarkedList) &&
        memberCourseList?.length === 0 && (
          <Noresult
            iconHeight={100}
            iconWidth={100}
            size={cssToken.TEXT_SIZE['text-16']}
          />
        )}
      <CounterContainer>
        <Text
          styles={{
            size: `${cssToken.TEXT_SIZE['text-16']}`,
            weight: 500,
            color: `${cssToken.COLOR['gray-900']}`,
          }}
        >
          등록된{' '}
          {selectTab === 'First'
            ? `일정이 ${myCourseCount}`
            : ` 즐겨찾기가 ${BookmarkCount}`}
          개 있습니다.
        </Text>
      </CounterContainer>

      <CardWrapper>
        {selectTab === 'First'
          ? memberCourseList?.map((post: MypCourseSummaryT) => (
            <ContensCard
              key={post.courseId}
              type="post"
              title={post.courseTitle}
              text={post.postContent}
              likeCount={post.courseLikeCount}
              userName={post.memberNickname}
              thumbnail={post.courseThumbnail}
              onClick={moveToDetail}
              courseId={post.courseId}
              date={manufactureDate(post?.courseUpdatedAt)}
            >
              <CopyButton endpoint={`community/${post.postId}`} />
              <ShareKakaoButton endpoint={`community/${post.postId}`} />
            </ContensCard>
          ))
          : memberBookmarkedList?.map((post: MyBookMarkSummaryT) => (
            <ContensCard
              key={post.courseId}
              type="course"
              title={post.courseTitle}
              text={post.postContent}
              likeCount={post.courseLikeCount}
              tag={post.tags}
              userName={post.memberNickname}
              thumbnail={post.courseThumbnail}
              onClick={moveToDetail}
              courseId={post.courseId}
              tags={post.tags}
              bookmarkStatus
              likeStatus={post.likeStatus}
              date={manufactureDate(post?.courseUpdatedAt)}
            >
              <CopyButton endpoint={`community/${post.postId}`} />
              <ShareKakaoButton endpoint={`community/${post.postId}`} />
            </ContensCard>
          ))}
      </CardWrapper>
      <div ref={ref} />
    </FilterWrapper>
  );
};

export default FilterSection;
