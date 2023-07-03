import { styled } from 'styled-components';

import CatContainer from '../../components/ui/error/CatContainer';
import ErrorBtnContainer from '../../components/ui/error/ErrorBtnContainer';
import cssToken from '../../styles/cssToken';

const ErrorWrapper = styled.div`
  width: ${cssToken.WIDTH['w-screen']};
  height: ${cssToken.HEIGHT['h-screen']};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const ErrorPage = () => {
  return (
    <ErrorWrapper>
      <CatContainer status={404} />
      <ErrorBtnContainer />
    </ErrorWrapper>
  );
};

export default ErrorPage;
