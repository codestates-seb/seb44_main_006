import { styled } from 'styled-components';

import cssToken from '../../../styles/cssToken';
import GrayButton from '../../ui/button/GrayButton';
import useMovePage from '../../../hooks/useMovePage';
import { FlexDiv } from '../../../styles/styles';

const MoveBtnDiv = styled(FlexDiv)`
  justify-content: center;
  margin-bottom: ${cssToken.SPACING['gap-50']};
`;
const PageMoveButton = () => {
  const goToCommunity = useMovePage('/community');

  return (
    <MoveBtnDiv>
      <GrayButton
        width="222px"
        height="53px"
        borderRadius={cssToken.BORDER['rounded-md']}
        onClick={goToCommunity}
      >
        목록
      </GrayButton>
    </MoveBtnDiv>
  );
};

export default PageMoveButton;