import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';

import { RootState } from '../store';
import mainImg from '../assets/mainImg.png';
import cssToken from '../styles/cssToken';
import CursorPointer from '../components/ui/cursor/cursorPointer';
import useLoginToggleModal from '../hooks/useLoginToggleModal';
import showToast from '../utils/showToast';
import useMovePage from '../hooks/useMovePage';
import useUserInfo from '../querys/useUserInfo';
import getLoginStatus from '../utils/getLoginStatus';

const MainContainer = styled.main`
  cursor: none;
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    cursor: default;
    flex-direction: column-reverse;
  }
`;

const SectionBox = styled.section`
  height: ${cssToken.HEIGHT['h-screen']};
  width: ${cssToken.WIDTH['w-screen']};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainLink = styled.button`
  cursor: none;
  text-decoration: none;
  outline: none;
  font-size: 70px;
  font-weight: ${cssToken.FONT_WEIGHT.bold};
  position: relative;

  &::after {
    transition: 0.3s;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }

  &:hover::after {
    display: block;
    width: 100%;
    text-align: center;
  }

  > span {
    display: block;
    width: ${cssToken.WIDTH['w-full']};
  }
  &:hover span {
    visibility: hidden;
  }

  @media (max-width: 1280px) {
    font-size: 50px;
  }

  @media (max-width: 768px) {
    font-size: 50px;
    cursor: default;
  }
`;

const CommunitySection = styled(SectionBox)`
  background: ${cssToken.COLOR.white};
  height: 100vh;
  padding: 0 30px;

  > button {
    color: ${cssToken.COLOR['point-500']};
    &:hover::after {
      content: '커뮤니티';
    }
  }

  @media (min-width: 768px) {
    flex: 1;
  }
`;

const ScheduleSection = styled(SectionBox)`
  background-image: url(${mainImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  flex: 2;
  position: relative;
  overflow: hidden;

  > img {
    position: absolute;
    -webkit-user-drag: none;
    transition: 1s;
  }

  > button {
    position: relative;
    z-index: 2;
    color: ${cssToken.COLOR.white};
    &:hover::after {
      content: '일정 등록';
    }
  }

  &:hover img {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    flex: auto;
  }
`;

const Main = () => {
  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = useState<boolean>(true);
  const isLoggedIn = getLoginStatus();
  const goToRegister = useMovePage('/register');
  const goToCommunity = useMovePage('/community');

  const { userData: userInfo } = useUserInfo();

  const LogintoggleModal = useLoginToggleModal();

  const checkScheduleCount = () => {
    if (userInfo && userInfo.myCourseCount >= 30) {
      showToast('warning', `일정은 30개를 초과해서 만드실 수 없습니다!`)();
      return;
    }
    goToRegister();
  };

  useEffect(() => {
    const getUserData = async () => {
      const userData = await queryClient.invalidateQueries(['user']);
      return userData;
    };
    if (isLoggedIn) {
      getUserData()
        .then(() => {
          console.log('유저정보 가져오기 성공');
        })
        .catch(() => {
          console.log('유저정보가져오기 실패');
        });
    }
  }, [isLoggedIn, queryClient]);

  const handleMouseEnter = () => {
    setIsHovered((prev) => !prev);
  };

  const handleMouseLeave = () => {
    setIsHovered((prev) => !prev);
  };

  return (
    <MainContainer>
      <CursorPointer isMouseHover={isHovered} />
      <CommunitySection>
        <MainLink
          onClick={goToCommunity}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span>Community</span>
        </MainLink>
      </CommunitySection>
      <ScheduleSection>
        <MainLink
          onClick={isLoggedIn ? checkScheduleCount : LogintoggleModal}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span>Schedule</span>
        </MainLink>
        <img src={`${mainImg}`} alt="bgimg" />
      </ScheduleSection>
    </MainContainer>
  );
};

export default Main;
