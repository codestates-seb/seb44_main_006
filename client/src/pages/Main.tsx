import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import Landing from './Landing';

import mainImg from '../assets/mainImg.webp';
import cssToken from '../styles/cssToken';
import CursorPointer from '../components/ui/cursor/cursorPointer';
import useLoginToggleModal from '../hooks/useLoginToggleModal';
import showToast from '../utils/showToast';
import useMovePage from '../hooks/useMovePage';
import useUserInfo from '../querys/useUserInfo';
import getLoginStatus from '../utils/getLoginStatus';
import { CircleButton } from '../components/ui/button/index';
import { FlexDiv } from '../styles/styles';
import scrollToTop from '../utils/scrollToTop';

const MainContainer = styled.main`
  position: relative;
  cursor: none;
  display: flex;
  flex-direction: row;
  @media (max-width: 1280px) {
    cursor: default;
  }
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const SectionBox = styled.section`
  height: ${cssToken.HEIGHT['h-screen']};
  width: ${cssToken.WIDTH['w-screen']};
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    height: calc(var(--vh, 1vh) * 50);
  }
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
    cursor: default;
  }
`;

const CommunitySection = styled(SectionBox)`
  flex: 1;
  background: ${cssToken.COLOR.white};
  height: 100vh;
  padding: 0 30px;

  > button {
    color: ${cssToken.COLOR['point-500']};
    &:hover::after {
      content: '커뮤니티';
    }
  }

  @media (max-width: 768px) {
    height: calc(var(--vh, 1vh) * 50);
    flex: auto;
  }
`;

const ScheduleSection = styled(SectionBox)`
  flex: 2;
  position: relative;
  overflow: hidden;

  > img {
    position: absolute;
    -webkit-user-drag: none;
    transition: 1s;
    width: 100%;
    height: 100%;
    object-fit: cover;
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

const FixedDiv = styled.div`
  position: fixed;
  right: ${cssToken.SPACING['gap-40']};
  bottom: ${cssToken.SPACING['gap-40']};
  z-index: 1;

  .circle {
    width: 5rem;
    height: 5rem;
    background-color: ${cssToken.COLOR['gray-900']};
    color: ${cssToken.COLOR.white};
  }

  @media screen and (max-width: 768px) {
    right: 1rem;
    bottom: 5.5rem;

    .circle {
      width: 4rem;
      height: 4rem;
      div {
        font-size: 1rem;
      }
    }
  }
`;

const ScrollArrow = styled(FlexDiv)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, 0);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-end;

  > span {
    width: 24px;
    height: 24px;
    border-left: 1px solid white;
    border-bottom: 1px solid white;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: sdb 2s infinite;
    animation: sdb 2s infinite;
    opacity: 0;
    box-sizing: border-box;
    @media screen and (max-width: 768px) {
      border-color: black;
    }
  }
  > span:nth-of-type(1) {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }
  > span:nth-of-type(2) {
    -webkit-animation-delay: 0.15s;
    animation-delay: 0.15s;
  }
  > span:nth-of-type(3) {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  > p {
    color: white;
    margin-top: ${cssToken.SPACING['gap-20']};
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  @-webkit-keyframes sdb {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes sdb {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Main = () => {
  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = useState<boolean>(true);
  const isLoggedIn = getLoginStatus();
  const goToRegister = useMovePage('/register');
  const goToCommunity = useMovePage('/community');

  const { userData: userInfo } = useUserInfo(isLoggedIn);

  const LogintoggleModal = useLoginToggleModal();

  const checkScheduleCount = () => {
    if (userInfo && userInfo.myCourseCount >= 30) {
      showToast('warning', `일정은 30개를 초과해서 만드실 수 없습니다!`)();
      return;
    }
    goToRegister();
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      return queryClient.invalidateQueries(['user']);
    };
    if (isLoggedIn) {
      getUserData()
        .then(() => {
          return queryClient.invalidateQueries(['user']);
        })
        .catch((err) => {
          throw err;
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
    <>
      <MainContainer>
        <ScrollArrow>
          <span />
          <span />
          <span />
          <p>이용방법</p>
        </ScrollArrow>
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
      <Landing />
      <FixedDiv
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <CircleButton width="117px" height="117px">
          <div>Top</div>
        </CircleButton>
      </FixedDiv>
    </>
  );
};

export default Main;
