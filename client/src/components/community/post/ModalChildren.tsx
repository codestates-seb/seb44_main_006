import cssToken from '../../../styles/cssToken';
import { BtnDiv, ModalChildrenDiv } from '../../../styles/styles';
import { Voidfunc } from '../../../types/type';
import GrayButton from '../../ui/button/GrayButton';
import SkyBlueButton from '../../ui/button/SkyBlueButton';
import Text from '../../ui/text/Text';

const ModalChildren = ({
  toggleModal,
  gotoBack,
}: {
  toggleModal: Voidfunc;
  gotoBack: Voidfunc;
}) => {
  return (
    <ModalChildrenDiv>
      <Text styles={{ size: cssToken.TEXT_SIZE['text-50'] }}>
        작성하신 내용이 사라집니다.
      </Text>
      <BtnDiv>
        <GrayButton
          onClick={toggleModal}
          width="15.5625rem"
          height="4.625rem"
          fontsize={cssToken.TEXT_SIZE['text-24']}
          borderRadius={cssToken.BORDER['rounded-md']}
        >
          아니오
        </GrayButton>
        <SkyBlueButton
          onClick={gotoBack}
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
