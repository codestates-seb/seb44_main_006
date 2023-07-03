import styled from 'styled-components';

import GlobalStyle from './GlobalStyle';
import ContensCard from './components/ui/cards/ContentsCard';

const CardListContainer = styled.article`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 50px 100px;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <CardListContainer>
        <ContensCard />
        <ContensCard />
        <ContensCard />
        <ContensCard />
      </CardListContainer>
    </>
  );
};

export default App;
