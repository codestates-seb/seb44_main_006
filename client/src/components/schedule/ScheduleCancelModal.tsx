import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { SetStateAction } from 'react';

import cssToken from '../../styles/cssToken';
import Modal from '../ui/modal/Modal';
import GrayButton from '../ui/button/GrayButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import useMovePage from '../../hooks/useMovePage';
import { scheduleListActions } from '../../store/scheduleList-slice';
import { selectedIdActions } from '../../store/selectedId-slice';

const Wrapper = styled.div`
  width: ${cssToken.WIDTH['w-full']};
  height: ${cssToken.HEIGHT['h-full']};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${cssToken.SPACING['gap-50']};
`;

const TextContainer = styled.section`
  text-align: center;
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${cssToken.SPACING['gap-12']};
`;

const ScheduleCancelModal = ({
  setIsCancel,
}: {
  setIsCancel: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const navigateMain = useMovePage('/');

  const handleYes = () => {
    dispatch(scheduleListActions.resetList());
    dispatch(selectedIdActions.allReset());
    setIsCancel(true);
    navigateMain();
  };

  const handleNo = () => {
    setIsCancel(false);
  };

  return (
    <Modal
      styles={{
        width: '25rem',
        height: '15rem',
        borderradius: `${cssToken.BORDER['rounded-s']}`,
      }}
    >
      <Wrapper>
        <TextContainer>
          작성하신 내용이 사라집니다. <br /> 정말 취소하시겠습니까?
        </TextContainer>
        <ButtonWrapper>
          <GrayButton
            width="150px"
            height="50px"
            borderRadius={cssToken.BORDER['rounded-md']}
            onClick={handleYes}
          >
            네
          </GrayButton>
          <SkyBlueButton
            width="150px"
            height="50px"
            borderRadius={cssToken.BORDER['rounded-md']}
            onClick={handleNo}
          >
            아니오
          </SkyBlueButton>
        </ButtonWrapper>
      </Wrapper>
    </Modal>
  );
};

export default ScheduleCancelModal;
