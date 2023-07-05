import { styled } from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import mainImg from '../../assets/mainImg.png';
import cssToken from '../../styles/cssToken';
import Modal from '../../components/ui/modal/Modal';
import LocationButton from '../../components/ui/button/LocationButton';
import Title from '../../components/ui/text/Title';
import GrayButton from '../../components/ui/button/GrayButton';
import SkyBlueButton from '../../components/ui/button/SkyBlueButton';

const Container = styled.div`
  width: ${cssToken.WIDTH['w-screen']};
  height: ${cssToken.HEIGHT['h-screen']};
  background-image: url(${mainImg});
  background-size: cover;
  background-repeat: no-repeat;
`;

const MiddleButtonWrapper = styled.section`
  width: ${cssToken.WIDTH['min-w-fit']};
  display: flex;
  gap: ${cssToken.SPACING['gap-24']};
`;

const BottomButtonWrapper = styled.section`
  width: ${cssToken.WIDTH['min-w-fit']};
  display: flex;
  gap: ${cssToken.SPACING['gap-16']};
`;

const ScheduleStart = () => {
  const [choiceCurrent, setChoiceCurrent] = useState(false);
  const [choiceDirect, setChoiceDirect] = useState(false);

  const handleCurrent = () => {
    setChoiceCurrent(true);
    setChoiceDirect(false);
  };

  const handleDirect = () => {
    setChoiceCurrent(false);
    setChoiceDirect(true);
  };

  return (
    <Container>
      <Modal
        styles={{
          width: '700px',
          height: '500px',
          borderradius: `${cssToken.BORDER['rounded-s']}`,
          gap: `${cssToken.SPACING['gap-50']}`,
        }}
      >
        <Title styles={{ size: `${cssToken.TEXT_SIZE['text-32']}` }}>
          출발지를 선택해주세요
        </Title>
        <MiddleButtonWrapper>
          <LocationButton
            width="200px"
            height="200px"
            svgWidth="50px"
            svgHeight="50px"
            isActive={choiceCurrent}
            onClick={handleCurrent}
            title="current"
          />
          <LocationButton
            width="200px"
            height="200px"
            svgWidth="50px"
            svgHeight="50px"
            isActive={choiceDirect}
            onClick={handleDirect}
          />
        </MiddleButtonWrapper>
        <BottomButtonWrapper>
          <GrayButton
            width="150px"
            height="50px"
            borderRadius={cssToken.BORDER['rounded-md']}
            onClick={handleCurrent}
          >
            <Link to="/main">뒤로가기</Link>
          </GrayButton>
          <SkyBlueButton
            width="150px"
            height="50px"
            borderRadius={cssToken.BORDER['rounded-md']}
            onClick={handleCurrent}
          >
            <Link to="/main">선택완료</Link>
          </SkyBlueButton>
        </BottomButtonWrapper>
      </Modal>
    </Container>
  );
};

export default ScheduleStart;
