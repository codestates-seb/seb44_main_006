import { styled } from 'styled-components';
import { useLocation } from 'react-router-dom';

import CatContainer from '../../components/ui/error/CatContainer';
import ErrorBtnContainer from '../../components/ui/error/ErrorBtnContainer';
import cssToken from '../../styles/cssToken';
import Text from '../../components/ui/text/Text';

const ErrorWrapper = styled.div`
  width: ${cssToken.WIDTH['w-screen']};
  height: ${cssToken.HEIGHT['h-screen']};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
  row-gap: ${cssToken.SPACING['gap-20']};
  @media screen and (max-width: 768px) {
    .errorBtn {
      display: none;
    }
  }
`;

type ResError = {
  status: number;
  errormsg: string;
};

const ErrorPage = () => {
  const response = useLocation().state as ResError;
  return (
    <ErrorWrapper>
      <CatContainer status={response.status} />
      <Text
        styles={{
          color: cssToken.COLOR.white,
          weight: cssToken.FONT_WEIGHT.medium,
        }}
      >
        {response.errormsg}
      </Text>
      <ErrorBtnContainer />
    </ErrorWrapper>
  );
};

export default ErrorPage;
