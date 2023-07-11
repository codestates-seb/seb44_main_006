import { styled } from 'styled-components';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import cssToken from '../../styles/cssToken';
import { FlexDiv } from '../../styles/styles';
import UserInfoMy from '../../components/ui/UserInfoPfp';
import { GetMyList, PatchMemNickname } from '../../apis/api';
import { setUserOAuthActions } from '../../store/userAuth-slice';
import Pen from '../../assets/Pen';
import ContensCard from '../../components/ui/cards/ContentsCard';
import InputContainer from '../../components/ui/input/InputContainer';
import UserInfoBox from '../../components/mypage/UserInfoBox';


const Wrapper = styled(FlexDiv)`
  margin-top: 77px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 6.5rem;
  row-gap: 7.75rem;
`;

const FixedDiv = styled.article`
  position: fixed;
  right: ${cssToken.SPACING['gap-40']};
  bottom: ${cssToken.SPACING['gap-40']};
`;

const MyPage = () => {
  const dispatch = useDispatch();

  const userAuthInfo = useSelector(
    (state: RootState) => state.userAuth.userInfo
  );

  const { data: userInfoData } = useQuery({
    queryKey: ['userInf'],
    queryFn: () => GetMyList(),
    onError: (error: AxiosError) => {
      navigate(`/error/${error.status as string}`);
    },
  });

  const memberCourseList = userInfoData?.data?.memberCourseList[0];
  const memberBookmarkedList = userInfoData?.data?.memberBookmarkedList;


  return (
    <Wrapper>
      <UserInfoBox />

      <section>
        {/* title=""
          text=""
          likeCount=""
          tag=""
          userName=""
          thumbnail=""
          onClick=""
          selectId=""
          postId=""
          courseId=""
          children=""
          likeStatus=""
          bookmarkStatus=""
          type=""
          date="" */}
        {/* {
          memberCourseList.map((el, idx) => (
            <ContensCard
              key={idx}
              title={el.courseTitle}

            />
          ))
        } */}
        <ContensCard
        />
      </section>
    </Wrapper>
  );
};

export default MyPage;
