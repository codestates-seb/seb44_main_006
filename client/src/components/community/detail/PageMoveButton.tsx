import { styled } from 'styled-components';

import cssToken from '../../../styles/cssToken';
import useMovePage from '../../../hooks/useMovePage';
import { FlexDiv } from '../../../styles/styles';
import GrayButton from '../../ui/button/GrayButton';

const MoveBtnDiv = styled(FlexDiv)`
  justify-content: center;
  margin-bottom: ${cssToken.SPACING['gap-50']};

  @media screen and (max-width: 768px) {
    button {
      display: none;
    }
  }
`;
const PageMoveButton = () => {
  const goToCommunity = useMovePage('/community');

  return (
    <MoveBtnDiv>
      <GrayButton
        width="222px"
        height="53px"
        brradius={cssToken.BORDER['rounded-md']}
        onClick={goToCommunity}
      >
        목록
      </GrayButton>
    </MoveBtnDiv>
  );
};

export default PageMoveButton;
