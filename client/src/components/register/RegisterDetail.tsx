import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import cssToken from '../../styles/cssToken';
import CloseButton from '../ui/button/CloseButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import { overlayActions } from '../../store/overlay-slice';
import useToggleModal from '../../hooks/useToggleModal';

const RegisterDetailContainer = styled.section`
  padding: 20px;
  position: fixed;
  z-index: 9999;
  width: 900px;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const PlaceEmbedBox = styled.embed`
  display:flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90vh;
`;

const RegisterDetail = ({ placeUrl }): string => {
  const toggleModal = useToggleModal();

  return (
    <RegisterDetailContainer>
      <TopContainer>
        <CloseButton onClick={toggleModal} />
      </TopContainer>
      <PlaceEmbedBox src="https://place.map.kakao.com/10731896" />
      <SkyBlueButton
        width="15.5625rem"
        height="3.4rem"
        fontsize={cssToken.TEXT_SIZE['text-18']}
        borderRadius={cssToken.BORDER['rounded-md']}
      >
        추가 하기
      </SkyBlueButton>
    </RegisterDetailContainer>
  )
};

export default RegisterDetail;
