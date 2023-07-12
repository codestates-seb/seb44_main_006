import { styled } from 'styled-components';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import cssToken from '../../styles/cssToken';
import { CardWrapper, FlexDiv } from '../../styles/styles';
import ContensCard from '../../components/ui/cards/ContentsCard';
import Head from '../../components/community/Head';
import PageMoveBtnDiv from '../../components/community/PageMoveButton';
import useMovePage from '../../hooks/useMovePage';
import { GetMyList } from '../../apis/api';
import { MemberBookmaredT, MemberCourseT } from '../../types/apitype';
import Title from '../../components/ui/text/Title';
import Text from '../../components/ui/text/Text';
import SkyBlueButton from '../../components/ui/button/SkyBlueButton';

const OutsideWrap = styled(FlexDiv)`
  margin-top: 77px;
  padding-top: ${cssToken.SPACING['px-50']};
  padding-left: ${cssToken.SPACING['py-100']};
  padding-right: ${cssToken.SPACING['py-100']};
  flex-direction: column;
  row-gap: ${cssToken.SPACING['gap-50']};
`;

const OverFlowDiv = styled.div`
  height: 62vh;
  overflow: auto;
`;

const EmptyDiv = styled(FlexDiv)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: ${cssToken.SPACING['gap-40']};
`;

const SelectSchedulePage = () => {
  const [selectId, setSelectId] = useState<number | null | undefined>(null);
  const navigate = useNavigate();
  const gotoBack = useMovePage('/community');
  const gotoNext = useMovePage('/community/post', selectId);
  const gotoRegister = useMovePage('/register');
  const { data: courses, error } = useQuery({
    queryKey: ['selectList'],
    queryFn: GetMyList,
    refetchOnWindowFocus: false,
    select: (data: {
      data: {
        memberCourseList: MemberCourseT[];
        memberBookarkedList: MemberBookmaredT[];
      };
    }): MemberCourseT[] => data.data.memberCourseList,
  });

  const registerCourses = courses
    ? courses.filter((course: MemberCourseT) => course.isPosted === false)
    : [];

  const handleClickCard = (courseId: number | undefined) => {
    if (courseId === selectId) setSelectId(null);
    else setSelectId(courseId);
  };
  const goToWrite = () => {
    if (selectId) {
      gotoNext();
    }
  };

  if (error) {
    // Todo error 객체 확인
    navigate(`/error/500`);
  }

  return (
    <OutsideWrap>
      <Head />
      <OverFlowDiv>
        {registerCourses.length > 0 && (
          <CardWrapper>
            {registerCourses.map((course) => (
              <ContensCard
                type="course"
                key={course.courseId}
                title={course.courseTitle}
                text={course.courseContent}
                likeCount={course.courseLikeCount}
                userName={course.memberNickname}
                thumbnail={course.courseThumbnail}
                courseId={course.courseId}
                selectId={selectId}
                onClick={handleClickCard}
              />
            ))}
          </CardWrapper>
        )}
        {registerCourses.length < 1 && (
          <EmptyDiv>
            <Title styles={{ size: cssToken.TEXT_SIZE['text-80'] }}>텅</Title>
            <Text
              styles={{
                size: cssToken.TEXT_SIZE['text-40'],
                color: cssToken.COLOR['gray-900'],
                weight: cssToken.FONT_WEIGHT.medium,
              }}
            >
              커뮤니티에 등록할 수 있는 일정이 없습니다.
            </Text>
            <SkyBlueButton
              borderRadius={cssToken.BORDER['rounded-md']}
              width="187px"
              height="55px"
              onClick={gotoRegister}
            >
              일정등록하기
            </SkyBlueButton>
          </EmptyDiv>
        )}
      </OverFlowDiv>
      <PageMoveBtnDiv grayCallback={gotoBack} skyblueCallback={goToWrite} />
    </OutsideWrap>
  );
};

export default SelectSchedulePage;
