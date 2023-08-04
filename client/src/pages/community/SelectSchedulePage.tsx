import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { mgpd } from './commonstyle';

import cssToken from '../../styles/cssToken';
import { CardWrapper, FlexDiv } from '../../styles/styles';
import { ContensCard } from '../../components/ui/cards/index';
import Head from '../../components/community/Head';
import PageMoveBtnDiv from '../../components/community/PageMoveButton';
import useMovePage from '../../hooks/useMovePage';
import { GetMyList } from '../../apis/api';
import { MemberBookmaredT, MemberCourseT } from '../../types/apitype';
import Title from '../../components/ui/text/Title';
import Text from '../../components/ui/text/Text';
import SkyBlueButton from '../../components/ui/button/SkyBlueButton';
import scrollToTop from '../../utils/scrollToTop';
import SkeletonCardContainer from '../../components/community/skeleton/SkeletonCardContainer';
import useValidEnter from '../../hooks/useValidEnter';
import thousandTok from '../../utils/thousandTok';
import formatData from '../../utils/sliceData';

const OutsideWrap = styled(FlexDiv)`
  margin-top: 77px;
  padding-top: ${cssToken.SPACING['px-50']};
  padding-left: ${cssToken.SPACING['py-100']};
  padding-right: ${cssToken.SPACING['py-100']};
  flex-direction: column;
  row-gap: ${cssToken.SPACING['gap-50']};

  @media screen and (max-width: 768px) {
    height: calc(100vh - 4.5rem);
    ${mgpd}
    margin-bottom: 4.5rem;
    row-gap: ${cssToken.SPACING['gap-20']};
  }
`;

const OverFlowDiv = styled.div`
  height: 62vh;
  overflow: auto;
  background-color: ${cssToken.COLOR['gray-300']};
  padding: ${cssToken.SPACING['gap-24']};
  margin-bottom: ${cssToken.SPACING['gap-24']};

  @media screen and (max-width: 500px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

const EmptyDiv = styled(FlexDiv)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: ${cssToken.SPACING['gap-20']};

  @media screen and (max-width: 768px) {
    > h1 {
      font-size: 1.875rem;
    }
    > p {
      font-size: 0.8125rem;
    }
  }
`;

const Jcbetween = styled(FlexDiv)`
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

const SelectCardWrapper = styled(CardWrapper)`
  @media screen and (max-width: 450px) {
    grid-template-columns: repeat(auto-fill, minmax(95%, auto));
  }
`;

const SelectSchedulePage = () => {
  const prevPage = useLocation().state as string;
  const checkValidEnter = useValidEnter();
  const [selectId, setSelectId] = useState<number | null | undefined>(null);
  const navigate = useNavigate();
  const gotoBack = useMovePage(
    prevPage === 'mypage' ? '/mypage' : '/community'
  );
  const gotoNext = useMovePage('/community/post', selectId);
  const gotoRegister = useMovePage('/register');
  const {
    data: courses,
    error,
    isLoading,
  } = useQuery({
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

  useEffect(() => {
    checkValidEnter();
    scrollToTop();
  }, [checkValidEnter]);

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
    const { response } = error as AxiosError;
    if (response) {
      navigate('/error', {
        state: {
          status: response.status,
          errormsg: response.statusText,
        },
      });
    }
  }

  return (
    <OutsideWrap>
      <Head />
      <Jcbetween>
        <OverFlowDiv>
          {isLoading && (
            <SelectCardWrapper>
              <SkeletonCardContainer length={4} />
            </SelectCardWrapper>
          )}
          {registerCourses.length > 0 && (
            <SelectCardWrapper>
              {registerCourses.map((course) => (
                <ContensCard
                  type="course"
                  key={course.courseId}
                  title={course.courseTitle}
                  text={course.courseContent}
                  likeCount={thousandTok(course.courseLikeCount)}
                  userName={course.memberNickname}
                  thumbnail={course.courseThumbnail}
                  courseId={course.courseId}
                  selectId={selectId}
                  onClick={handleClickCard}
                  date={`${formatData(String(course.courseDday))}`}
                />
              ))}
            </SelectCardWrapper>
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
                brradius={cssToken.BORDER['rounded-md']}
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
      </Jcbetween>
    </OutsideWrap>
  );
};

export default SelectSchedulePage;
