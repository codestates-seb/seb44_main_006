import { styled } from 'styled-components';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import cssToken from '../../styles/cssToken';
import { CardWrapper, FlexDiv } from '../../styles/styles';
import ContensCard from '../../components/ui/cards/ContentsCard';
import Head from '../../components/community/Head';
import PageMoveBtnDiv from '../../components/community/PageMoveButton';
import useMovePage from '../../hooks/useMovePage';
import { GetMyList } from '../../apis/api';
import { MemberListT } from '../../types/apitype';

const OutsideWrap = styled(FlexDiv)`
  margin-top: 77px;
  /* height: 100vh; */
  padding-top: ${cssToken.SPACING['px-50']};
  padding-left: ${cssToken.SPACING['py-100']};
  padding-right: ${cssToken.SPACING['py-100']};
  flex-direction: column;
  /* justify-content: space-between; */
  row-gap: ${cssToken.SPACING['gap-50']};
`;

const OverFlowDiv = styled.div`
  height: 62vh;
  overflow-y: scroll;
`;

const SelectSchedulePage = () => {
  const [selectId, setSelectId] = useState<number | null | undefined>(null);
  const gotoBack = useMovePage('/community');
  const gotoNext = useMovePage('/community/post', selectId);

  // FixMe: select type
  // Todo 텅 비었을 때 봉줄 컴포넌트 만들기
  const { data: courses } = useQuery({
    queryKey: ['selectList'],
    queryFn: GetMyList,
    refetchOnWindowFocus: false,
    select: (data) => data.data.memberCourseList,
  });

  const registerCourses = courses
    ? courses.filter((course: MemberListT) => course.isPosted === false)
    : [];

  const handleClickCard = (id: number | undefined) => {
    if (id === selectId) setSelectId(null);
    else setSelectId(id);
  };
  const goToWrite = () => {
    if (selectId) {
      gotoNext();
    }
  };
  return (
    <OutsideWrap>
      <Head />
      <OverFlowDiv>
        <CardWrapper>
          {registerCourses.length > 0 &&
            registerCourses.map((course) => (
              <ContensCard
                title={course.courseTitle}
                text={course.courseContent}
                likeCount={course.courseLikeCount}
                userName={course.memberNickname}
                thumbnail={course.courseThumbnail}
                id={course.courseId}
                selectId={selectId}
                onClick={handleClickCard}
              />
            ))}
          {registerCourses.length < 1 && <p>텅</p>}
        </CardWrapper>
      </OverFlowDiv>
      <PageMoveBtnDiv grayCallback={gotoBack} skyblueCallback={goToWrite} />
    </OutsideWrap>
  );
};

export default SelectSchedulePage;
