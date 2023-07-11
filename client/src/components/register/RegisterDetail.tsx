import { styled } from 'styled-components';

import cssToken from '../../styles/cssToken';
import CloseButton from '../ui/button/CloseButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import useToggleModal from '../../hooks/useToggleModal';

const RegisterDetailContainer = styled.section`
  padding: ${cssToken.SPACING['gap-24']};
  width: 900px;
  height: ${cssToken.HEIGHT['h-screen']};
  background: ${cssToken.COLOR.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${cssToken.SPACING['gap-24']};
`;

const TopContainer = styled.div`
  width: ${cssToken.WIDTH['w-full']};
  display: flex;
  justify-content: flex-end;
`;

const PlaceEmbedBox = styled.embed`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${cssToken.WIDTH['w-full']};
  height: 90vh;
`;

const RegisterDetail = ({ placeUrl }): string => {
  const toggleModal = useToggleModal();

  return (
    <RegisterDetailContainer>
      <TopContainer>
        <CloseButton onClick={toggleModal} />
      </TopContainer>
      <PlaceEmbedBox src={`https://place.map.kakao.com/${placeUrl}`} />
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
