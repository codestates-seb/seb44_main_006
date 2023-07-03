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
          userName="최지은"
          title="전부타비켜엘사불러도날못식혀쇳뿔 달고뛰어일 직선쉽"
          text="전부타비켜엘사불러도날못식혀쇳뿔 달고뛰어일 직선쉽"
          likeCount="60"
          tag={['엘사', '제발']}
        />
        <ContensCard
          title="전부타비켜엘사불러도날못식혀쇳뿔 달고뛰어일 직선쉽"
          text="전부타비켜엘사불러도날못식혀쇳뿔 달고뛰어일 직선쉽"
          likeCount="88"
          tag={['티켓팅', '여름']}
        />
      </CardListContainer>
    </>
  );
};

export default App;
