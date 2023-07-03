import { styled } from 'styled-components';

import InputContainer from './components/ui/input/InputContainer';

const Div = styled.div`
  background-color: gray;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return (
    <Div>
      <InputContainer />
    </Div>
  );
};

export default App;
