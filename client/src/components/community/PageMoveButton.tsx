import GrayButton from '../ui/button/GrayButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import cssToken from '../../styles/cssToken';
import { BtnDiv } from '../../styles/styles';

const PageMoveBtnDiv = ({
  grayCallback,
  skyblueCallback,
  disabled,
}: {
  grayCallback: () => void;
  skyblueCallback: () => void;
  disabled?: 'true' | 'false';
}) => {
  return (
    <BtnDiv>
      <GrayButton
        width="222px"
        height="53px"
        borderRadius={cssToken.BORDER['rounded-md']}
        onClick={grayCallback}
      >
        뒤로가기
      </GrayButton>
      <SkyBlueButton
        width="222px"
        height="53px"
        borderRadius={cssToken.BORDER['rounded-md']}
        onClick={skyblueCallback}
        disabled={disabled}
      >
        작성하기
      </SkyBlueButton>
    </BtnDiv>
  );
};

export default PageMoveBtnDiv;
