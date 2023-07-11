import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setUserOAuthActions } from '../store/userAuth-slice';
import { RootState } from '../store';
import mainImg from '../assets/mainImg.png';
import cssToken from '../styles/cssToken';
import CursorPointer from '../components/ui/cursor/cursorPointer';

const MainContainer = styled.main`
  cursor: none;
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const SectionBox = styled.section`
  height: ${cssToken.HEIGHT['h-screen']};
  width: ${cssToken.WIDTH['w-screen']};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainLink = styled(Link)`
  cursor: none;
  text-decoration: none;
  outline: none;
  font-size: 50px;
  font-weight: ${cssToken.FONT_WEIGHT.bold};
  > span {
    display: block;
    width: ${cssToken.WIDTH['w-full']};
  }
  &:hover span {
    display: none;
  }
  @media (min-width: 768px) {
    font-size: 50px;
  }

  @media (min-width: 1280px) {
    font-size: 70px;
  }
`;

const CommunitySection = styled(SectionBox)`
  background: ${cssToken.COLOR.white};
  transition: 0.3s;
  height: 100vh;
  > a {
    color: ${cssToken.COLOR['point-900']};
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
  transition: 0.3s;
  > a {
    color: ${cssToken.COLOR.white};
    &:hover::after {
      content: '일정 등록';
    }
  }
  @media (min-width: 768px) {
    flex: 2;
  }
`;

const Main = () => {
  const [isHovered, setIsHovered] = useState<boolean>(true);
  const isLoggedIn = useSelector((state: RootState) => state.userAuth.isLogin);

  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    setIsHovered((prev) => !prev);
  };

  const handleMouseLeave = () => {
    setIsHovered((prev) => !prev);
  };

  const LogintoggleModal = () => {
    dispatch(setUserOAuthActions.toggleIsLogin());
  };

  return (
    <MainContainer>
      <CursorPointer isMouseHover={isHovered} />
      <CommunitySection>
        <MainLink
          to="/community"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span>Community</span>
        </MainLink>
      </CommunitySection>
      <ScheduleSection>
        <MainLink
          onClick={isLoggedIn ? undefined : LogintoggleModal}
          to={isLoggedIn ? '/register' : '/'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span>Schedule</span>
        </MainLink>
      </ScheduleSection>
    </MainContainer>
  );
};

export default Main;
