import { styled } from 'styled-components';

import GrayButton from '../ui/button/GrayButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import cssToken from '../../styles/cssToken';
import { FlexDiv } from '../../styles/styles';
import useMovePage from '../../hooks/useMovePage';

const BtnDiv = styled(FlexDiv)`
  width: 100%;
  justify-content: center;
  column-gap: ${cssToken.SPACING['gap-12']};
  margin-bottom: ${cssToken.SPACING['gap-50']};
`;

const Btn = ({ backUrl, nextUrl }: { backUrl: string; nextUrl: string }) => {
  const goToPrev = useMovePage(backUrl);
  const goToNext = useMovePage(nextUrl);
  return (
    <BtnDiv>
      <GrayButton
        width="222px"
        height="53px"
        borderRadius={cssToken.BORDER['rounded-md']}
        onClick={goToPrev}
      >
        뒤로가기
      </GrayButton>
      <SkyBlueButton
        width="222px"
        height="53px"
        borderRadius={cssToken.BORDER['rounded-md']}
        onClick={goToNext}
      >
        작성하기
      </SkyBlueButton>
    </BtnDiv>
  );
};

export default Btn;
