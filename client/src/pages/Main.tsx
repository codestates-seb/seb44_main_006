import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { overlayActions } from '../store/overlay-slice';
import { RootState } from '../store';
import mainImg from '../assets/mainImg.png';
import cssToken from '../styles/cssToken';
import CursorPointer from '../components/ui/cursor/cursorPointer';

const MainContainer = styled.main`
  cursor: none;
  display: flex;
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
  font-size: 80px;
  font-weight: ${cssToken.FONT_WEIGHT.bold};
  > span {
    display: block;
    width: ${cssToken.WIDTH['w-full']};
  }
  &:hover span {
    display: none;
  }
`;

const CommunitySection = styled(SectionBox)`
  background: ${cssToken.COLOR.white};
  flex: 1;
  transition: 0.3s;
  > a {
    color: ${cssToken.COLOR['point-900']};
    &:hover::after {
      content: '커뮤니티';
    }
  }
`;

const ScheduleSection = styled(SectionBox)`
  background-image: url(${mainImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  flex: 2;
  transition: 0.3s;
  > a {
    color: ${cssToken.COLOR.white};
    &:hover::after {
      content: '일정 등록';
    }
  }
`;

const Main = () => {
  const [isHovered, setIsHovered] = useState<boolean>(true);
  const isLoggedIn = useSelector((state: RootState) => state.userAuth.isLogin);
  const modalIsOpen = useSelector(
    (state: RootState): boolean => state.overlay.isOpen
  );
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    setIsHovered((prev) => !prev);
  };

  const handleMouseLeave = () => {
    setIsHovered((prev) => !prev);
  };

  const toggleModal = () => {
    dispatch(overlayActions.toggleOverlay());
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
          onClick={isLoggedIn ? null : toggleModal}
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
