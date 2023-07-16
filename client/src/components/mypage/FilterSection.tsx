import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import ContensCard from '../ui/cards/ContentsCard';
import cssToken from '../../styles/cssToken';
import { CardWrapper, FlexDiv } from '../../styles/styles';
import { Props } from '../../types/type';
import { MypCourseSummaryT, MyBookMarkSummaryT } from '../../types/apitype';
import manufactureDate from '../../utils/manufactureDate';
import Noresult from '../ui/Noresult';
import ShareKakaoButton from '../ui/button/ShareKakaoButton';
import CopyButton from '../ui/button/CopyButton';
import Text from '../ui/text/Text';
import useUserInfo from '../../querys/useUserInfo';
import DeleteButton from '../community/DeleteButton';
import formatData from '../../utils/sliceData';

const FilterWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${cssToken.SPACING['gap-50']};
`;

const FilterContainer = styled(FlexDiv)`
  position: absolute;
  top: -2.9375rem;
  column-gap: ${cssToken.SPACING['gap-50']};
  width: ${cssToken.WIDTH['w-full']};
  border-bottom: 1px solid ${cssToken.COLOR['gray-600']};
  justify-content: center;
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
              ? `일정이 (30/${userData.myCourseCount})`
              : ` 즐겨찾기가 ${userData.myBookmarkCount}`)}
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
        {memberCourseList && selectTab === 'First'
          ? memberCourseList?.map((post: MypCourseSummaryT) => (
              <ContensCard
                key={post.courseId}
                type="course"
                title={post.courseTitle}
                likeCount={post.courseLikeCount}
                userName={post.memberNickname}
                thumbnail={post.courseThumbnail}
                onClick={moveToRegisterDetail}
                courseId={post.courseId}
                date={formatData(String(post?.courseDday))}
              >
                <DeleteButton type="mypage" postId={String(post.courseId)} />
                <CopyButton
                  endpoint={`register/detail/${String(post.courseId)}`}
                />
                <ShareKakaoButton
                  endpoint={`register/detail/${String(post.courseId)}`}
                />
              </ContensCard>
            ))
          : memberBookmarkedList?.map((post: MyBookMarkSummaryT) => (
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
                courseId={post.courseId}
                bookmarkStatus
                postId={post.postId}
                likeStatus={post.likeStatus}
                date={manufactureDate(post?.courseUpdatedAt)}
              >
                <CopyButton endpoint={`community/${String(post.postId)}`} />
                <ShareKakaoButton
                  endpoint={`community/${String(post.postId)}`}
                />
              </ContensCard>
            ))}
      </CardWrapper>
      <div ref={ref} />
    </FilterWrapper>
  );
};

export default FilterSection;
