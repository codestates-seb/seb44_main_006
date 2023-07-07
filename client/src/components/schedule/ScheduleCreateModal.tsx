import { styled } from 'styled-components';
import DatePicker from 'react-datepicker';
import { useState } from 'react';

import cssToken from '../../styles/cssToken';
import Modal from '../ui/modal/Modal';
import Title from '../ui/text/Title';
import SubTitle from '../ui/text/SubTitle';
import ThumbnailChoice from '../../assets/ThumbnailChoice';
import InputContainer from '../ui/input/InputContainer';
import TextArea from '../ui/input/TextArea';
import GrayButton from '../ui/button/GrayButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';

import 'react-datepicker/dist/react-datepicker.css';

const Wrapper = styled.div`
  width: ${cssToken.WIDTH['w-full']};
  height: ${cssToken.HEIGHT['h-full']};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${cssToken.SPACING['gap-50']};
`;

const TitleContainer = styled.section`
  width: 95%;
  display: flex;
  flex-direction: column;
  gap: ${cssToken.SPACING['gap-10']};
`;

const WriteContainer = styled.section`
  width: ${cssToken.WIDTH['w-full']};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const WriteLeftBox = styled.section`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const DataChoiceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${cssToken.SPACING['gap-24']};
`;

const WriteRightBox = styled.section`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${cssToken.SPACING['gap-12']};
`;

const DateInputBox = styled(DatePicker)`
  border: solid 1px #dcdcdc;
  text-align: center;
`;

const ScheduleCreateModal = () => {
  const [choiceDate, setChoiceDate] = useState(new Date());
  return (
    <Modal
      styles={{
        width: '65rem',
        height: '40rem',
        borderradius: `${cssToken.BORDER['rounded-s']}`,
      }}
    >
      <Wrapper>
        <TitleContainer>
          <Title styles={{ size: `${cssToken.TEXT_SIZE['text-32']}` }}>
            일정 저장하기
          </Title>
          <SubTitle styles={{ weight: 300 }}>
            일정 저장 시 주요 내용을 작성해 주세요!
          </SubTitle>
        </TitleContainer>
        <WriteContainer>
          <WriteLeftBox>
            <ThumbnailChoice style={{ iconWidth: 450, iconHeight: 350 }} />
            <DataChoiceWrapper>
              <div>날짜 선택</div>
              <DateInputBox
                minDate={new Date()}
                dateFormat="yyyy년 MM월 dd일"
                selected={choiceDate}
                onChange={(date: Date) => date && setChoiceDate(date)}
              />
            </DataChoiceWrapper>
          </WriteLeftBox>
          <WriteRightBox>
            <InputContainer
              description="일정의 제목을 작성해 주세요. (최대 30자, 필수)"
              styles={{
                width: `${cssToken.WIDTH['w-full']}`,
                height: `${cssToken.HEIGHT['h-min']}`,
              }}
            />
            <TextArea
              description="일정의 상세 설명을 작성해 주세요. (최대 40자, 필수)"
              styles={{
                width: `${cssToken.WIDTH['w-full']}`,
                height: '12rem',
              }}
            />
          </WriteRightBox>
        </WriteContainer>
        <ButtonWrapper>
          <GrayButton
            width="100px"
            height="50px"
            borderRadius={cssToken.BORDER['rounded-md']}
          >
            뒤로가기
          </GrayButton>
          <SkyBlueButton
            width="100px"
            height="50px"
            borderRadius={cssToken.BORDER['rounded-md']}
          >
            저장하기
          </SkyBlueButton>
        </ButtonWrapper>
      </Wrapper>
    </Modal>
  );
};

export default ScheduleCreateModal;
