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
`;

const CommunitySection = styled(SectionBox)`
  background: ${cssToken.COLOR.white};
  flex: 1;
  > a {
    color: ${cssToken.COLOR['point-900']};
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
  }
`;

const Main = () => {
  return (
    <MainContainer>
      <CommunitySection>
        <MainLink to="/">Community</MainLink>
      </CommunitySection>
      <ScheduleSection>
        <MainLink to="/">Schedule</MainLink>
      </ScheduleSection>
    </MainContainer>
  );
};

export default Main;
