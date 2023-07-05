import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

import mainImg from '../assets/mainImg.png';
import cssToken from '../styles/cssToken';

const MainContainer = styled.main`
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
  text-decoration: none;
  outline: none;
  font-size: 80px;
  font-weight: ${cssToken.FONT_WEIGHT.bold};
  &:hover span {
    display: none;
  }
`;

const CommunitySection = styled(SectionBox)`
  background: ${cssToken.COLOR.white};
  flex: 1;
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
  > a {
    color: ${cssToken.COLOR.white};
    &:hover::after {
      content: '일정 등록';
    }
  }
`;

const Main = () => {
  return (
    <MainContainer>
      <CommunitySection>
        <MainLink to="/">
          <span>Community</span>
        </MainLink>
      </CommunitySection>
      <ScheduleSection>
        <MainLink to="/">
          <span>Schedule</span>
        </MainLink>
      </ScheduleSection>
    </MainContainer>
  );
};

export default Main;
