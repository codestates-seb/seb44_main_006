import cssToken from '../../../styles/cssToken';
import { BtnDiv, ModalChildrenDiv } from '../../../styles/styles';
import { Voidfunc } from '../../../types/type';
import GrayButton from '../../ui/button/GrayButton';
import SkyBlueButton from '../../ui/button/SkyBlueButton';
import Text from '../../ui/text/Text';

const ModalChildren = ({
  leftBtnCallback,
  rightBtnCallback,
  content,
}: {
  leftBtnCallback: Voidfunc;
  rightBtnCallback: Voidfunc;
  content: string;
}) => {
  return (
    <ModalChildrenDiv>
      <Text styles={{ size: cssToken.TEXT_SIZE['text-50'] }}>{content}</Text>
      <BtnDiv>
        <GrayButton
          onClick={leftBtnCallback}
          width="15.5625rem"
          height="4.625rem"
          fontsize={cssToken.TEXT_SIZE['text-24']}
          borderRadius={cssToken.BORDER['rounded-md']}
        >
          아니오
        </GrayButton>
        <SkyBlueButton
          onClick={rightBtnCallback}
          width="15.5625rem"
          height="4.625rem"
          fontsize={cssToken.TEXT_SIZE['text-24']}
          borderRadius={cssToken.BORDER['rounded-md']}
        >
          예
        </SkyBlueButton>
      </BtnDiv>
    </ModalChildrenDiv>
  );
};

export default ModalChildren;
