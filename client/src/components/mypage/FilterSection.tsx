import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
  const [myCourseCount, setMyCourseCount] = useState<number>(0);
  const [bookmarkCount, setBookmarkCount] = useState<number>(0);
  const navigate = useNavigate();
  const [ref] = useInView();
  const { userData } = useUserInfo();
  const moveToDetail = (postId: number | undefined) => {
    if (postId !== undefined) navigate(`/community/${postId}`);
  };

  useEffect(() => {
    const countBookmark: number = userData?.myBookmarkCount ?? 0;
    const countMyCourse: number = userData?.myCourseCount ?? 0;
    setBookmarkCount(countBookmark);
    setMyCourseCount(countMyCourse);
  }, [userData, myCourseCount, bookmarkCount]);

  const isMemberCourseListEmpty =
    selectTab === 'First' && memberCourseList?.length === 0;
  const isMemberBookmarkedListEmpty =
    selectTab === 'Second' && memberBookmarkedList?.length === 0;

  return (
    <FilterWrapper>
      <FilterContainer>{children}</FilterContainer>
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
            : ` 즐겨찾기가 ${bookmarkCount}`}
          개 있습니다.
        </Text>
      </CounterContainer>
      {isMemberCourseListEmpty ||
        (isMemberBookmarkedListEmpty && (
          <Noresult
            iconHeight={100}
            iconWidth={100}
            size={cssToken.TEXT_SIZE['text-16']}
          />
        ))}

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
