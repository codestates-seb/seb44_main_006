import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import SkyBlueButton from '../button/SkyBlueButton';
import GrayButton from '../button/GrayButton';
import cssToken from '../../../styles/cssToken';
import { FlexDiv } from '../../../styles/styles';
import useMovePage from '../../../hooks/useMovePage';

const BtnDiv = styled(FlexDiv)`
  gap: ${cssToken.SPACING['gap-16']};
  margin-bottom: ${cssToken.SPACING['gap-40']};
`;

const MainLav = styled(Link)`
  color: white;
  text-decoration: none;
`;

const ErrorBtnContainer = () => {
  // Todo url 변경해야함
  const goToBack = useMovePage('/');
  return (
    <>
      <BtnDiv>
        <GrayButton
          width="222px"
          height="53px"
          borderRadius={cssToken.BORDER['rounded-md']}
          onClick={goToBack}
        >
          뒤로가기
        </GrayButton>
        <SkyBlueButton
          width="222px"
          height="53px"
          borderRadius={cssToken.BORDER['rounded-md']}
        >
          재시도 하기
        </SkyBlueButton>
      </BtnDiv>
      <MainLav to="/">메인으로 가기</MainLav>
    </>
  );
};

export default ErrorBtnContainer;
