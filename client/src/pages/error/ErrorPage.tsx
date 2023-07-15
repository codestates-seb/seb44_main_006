import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';

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

  @media screen and (max-width: 768px) {
    .errorBtn {
      display: none;
    }
  }
`;

const ErrorPage = () => {
  const { status } = useParams();
  return (
    <ErrorWrapper>
      <CatContainer status={Number(status)} />
      <ErrorBtnContainer />
    </ErrorWrapper>
  );
};

export default ErrorPage;
