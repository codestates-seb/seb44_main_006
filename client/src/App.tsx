import styled from 'styled-components';

import GlobalStyle from './GlobalStyle';
import ContensCard from './components/ui/cards/ContentsCard';

const CardListContainer = styled.article`
  display: flex;
  gap: 0.9375rem;
  padding: 3.125rem 6.25rem;
  flex-wrap: wrap;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <CardListContainer>
        <ContensCard
          userName="김영웅"
          title="오늘티켓팅성공하게해주세요 제발요8시제발 게해주세요 제발요8시제발게해주세요 제발요8시제발"
          text="길막마전부타비켜엘사불러도날못식혀쇳뿔 달고뛰어일 직선쉽게타지마삐딱선직선쉽게타지마삐딱선직선쉽게타지마삐딱선"
          heartCount="23"
          tag={['티켓팅', '길막', '오늘']}
        />
        <ContensCard
          userName="류지수"
          title="오늘티켓팅성공하게"
          text="길막마전부타비켜엘사불러도날못"
          heartCount="55"
          tag={['티켓팅', '제발']}
        />
        <ContensCard
          userName="최지은"
          title="전부타비켜엘사불러도날못식혀쇳뿔 달고뛰어일 직선쉽"
          text="전부타비켜엘사불러도날못식혀쇳뿔 달고뛰어일 직선쉽"
          heartCount="60"
          tag={['엘사', '제발']}
        />
        <ContensCard
          title="전부타비켜엘사불러도날못식혀쇳뿔 달고뛰어일 직선쉽"
          text="전부타비켜엘사불러도날못식혀쇳뿔 달고뛰어일 직선쉽"
          heartCount="88"
          tag={['티켓팅', '여름']}
        />
        <ContensCard
          title="5"
          text="8"
          heartCount="1"
          tag={['티켓팅', '제발']}
        />
      </CardListContainer>
    </>
  );
};

export default App;
