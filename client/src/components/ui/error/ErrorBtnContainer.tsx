import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import cssToken from '../../../styles/cssToken';
import { FlexDiv } from '../../../styles/styles';
import SkyBlueButton from '../button/SkyBlueButton';
import GrayButton from '../button/GrayButton';

const BtnDiv = styled(FlexDiv)`
  gap: ${cssToken.SPACING['gap-16']};
  margin-bottom: ${cssToken.SPACING['gap-40']};
`;

const ErrorBtnContainer = () => {
  const navigate = useNavigate();
  return (
    <BtnDiv className="errorBtn">
      <GrayButton
        width="222px"
        height="53px"
        brradius={cssToken.BORDER['rounded-md']}
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </GrayButton>
      <SkyBlueButton
        width="222px"
        height="53px"
        brradius={cssToken.BORDER['rounded-md']}
        onClick={() => {
          navigate('/', { replace: true });
        }}
      >
        메인으로 가기
      </SkyBlueButton>
    </BtnDiv>
  );
};

export default ErrorBtnContainer;
