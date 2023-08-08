import cssToken from '../../../styles/cssToken';
import { BtnDiv, ModalChildrenDiv } from '../../../styles/styles';
import { MouseEventfunc } from '../../../types/type';
import GrayEventButton from '../../ui/button/GrayEventButton';
import SkyBlueEventButton from '../../ui/button/SkyBlueEventButton';
import Text from '../../ui/text/Text';

const ModalChildren = ({
  leftBtnCallback,
  rightBtnCallback,
  content,
}: {
  leftBtnCallback: MouseEventfunc;
  rightBtnCallback: MouseEventfunc;
  content: string;
}) => {
  return (
    <ModalChildrenDiv>
      <Text styles={{ size: cssToken.TEXT_SIZE['text-16'], weight: 500 }}>
        {content}
      </Text>
      <BtnDiv>
        <GrayEventButton
          onClick={leftBtnCallback}
          width="9.375rem"
          height="3.125rem"
          fontsize={cssToken.TEXT_SIZE['text-16']}
          brradius={cssToken.BORDER['rounded-md']}
        >
          예
        </GrayEventButton>
        <SkyBlueEventButton
          onClick={rightBtnCallback}
          width="9.375rem"
          height="3.125rem"
          fontsize={cssToken.TEXT_SIZE['text-16']}
          brradius={cssToken.BORDER['rounded-md']}
        >
          아니오
        </SkyBlueEventButton>
      </BtnDiv>
    </ModalChildrenDiv>
  );
};

export default ModalChildren;
