import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const MainLav = styled(Link)`
  color: white;
  text-decoration: none;
`;

const ErrorBtnContainer = () => {
  return <MainLav to="/">메인으로 가기</MainLav>;
};

export default ErrorBtnContainer;
