import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import SkeletonCardContainer from '../community/skeleton/SkeletonCardContainer';
import { ContensCard } from '../ui/cards/index';
import cssToken from '../../styles/cssToken';
import { CardWrapper, FlexDiv } from '../../styles/styles';
import { Props } from '../../types/type';
import { MypCourseSummaryT, MyBookMarkSummaryT } from '../../types/apitype';
import manufactureDate from '../../utils/manufactureDate';
import NoResults from '../community/NoResults';
import Text from '../ui/text/Text';
import useUserInfo from '../../querys/useUserInfo';
import DeleteButton from '../community/DeleteButton';
import formatData from '../../utils/sliceData';
import thousandTok from '../../utils/thousandTok';
import ShareKakaoButton from '../ui/button/ShareKakaoButton';
import CopyButton from '../ui/button/CopyButton';
import EditorButtonComponent from '../ui/button/EditorButton';

const FilterWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${cssToken.SPACING['gap-50']};
  background-color: ${cssToken.COLOR['gray-300']};

  @media screen and (max-width: 768px) {
    padding: ${cssToken.SPACING['gap-20']};
  }
`;

const FilterContainer = styled(FlexDiv)`
  position: absolute;
  top: -2.8rem;
  column-gap: ${cssToken.SPACING['gap-50']};
  width: ${cssToken.WIDTH['w-full']};
  border-bottom: 1px solid ${cssToken.COLOR['gray-600']};
  justify-content: center;

  @media screen and (max-width: 768px) {
    top: -2.2rem;
  }
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
  };

  const moveToRegisterDetail = (courseId: number | undefined) => {
    if (courseId !== undefined) navigate(`/register/detail/${courseId}`);
  };

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
          {userData &&
            (selectTab === 'First'
              ? `일정이 (${userData.myCourseCount}/30)`
              : ` 즐겨찾기가 ${userData.myBookmarkCount}`)}
          개 있습니다.
        </Text>
      </CounterContainer>
      {(isMemberCourseListEmpty || isMemberBookmarkedListEmpty) && (
        <NoResults />
      )}
      <CardWrapper>
        {memberCourseList && selectTab === 'First'
          ? memberCourseList?.map((post: MypCourseSummaryT) => {
              if (post.courseId !== -1)
                return (
                  <ContensCard
                    key={post.courseId}
                    type="course"
                    title={post.courseTitle}
                    text={post.courseContent}
                    likeCount={thousandTok(post.courseLikeCount)}
                    userName={post.memberNickname}
                    thumbnail={post.courseThumbnail}
                    onClick={moveToRegisterDetail}
                    courseId={post.courseId}
                    date={`${formatData(String(post?.courseDday))}`}
                  >
                    <EditorButtonComponent courseId={String(post?.courseId)} />
                    <DeleteButton
                      type="mypage"
                      postId={String(post.courseId)}
                    />
                    <CopyButton
                      endpoint={`register/detail/${String(
                        post.courseId
                      )}?share`}
                    />
                    <ShareKakaoButton
                      endpoint={`register/detail/${String(
                        post.courseId
                      )}?share`}
                    />
                  </ContensCard>
                );
              return <SkeletonCardContainer length={6} />;
            })
          : memberBookmarkedList?.map((post: MyBookMarkSummaryT) => {
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
                    courseId={post.courseId}
                    bookmarkStatus
                    postId={post.postId}
                    likeStatus={post.likeStatus}
                    answerCount={post.answerCount}
                    courseViewCount={post.courseViewCount}
                    date={manufactureDate(post?.courseUpdatedAt)}
                  >
                    <CopyButton endpoint={`community/${String(post.postId)}`} />
                    <ShareKakaoButton
                      endpoint={`community/${String(post.postId)}`}
                    />
                  </ContensCard>
                );
              return <SkeletonCardContainer length={6} />;
            })}
      </CardWrapper>
      <div ref={ref} />
    </FilterWrapper>
  );
};

export default FilterSection;
