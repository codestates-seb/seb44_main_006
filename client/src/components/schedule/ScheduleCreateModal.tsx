import { styled } from 'styled-components';
import DatePicker from 'react-datepicker';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ThumbnailChoiceContainer from './ThumbnailChoiceContainer';

import cssToken from '../../styles/cssToken';
import Modal from '../ui/modal/Modal';
import Title from '../ui/text/Title';
import SubTitle from '../ui/text/SubTitle';
import Thumbnail from '../../assets/Thumbnail';
import InputContainer from '../ui/input/InputContainer';
import TextArea from '../ui/input/TextArea';
import GrayButton from '../ui/button/GrayButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import 'react-datepicker/dist/react-datepicker.css';
import { overlayActions } from '../../store/overlay-slice';
import { RootState } from '../../store';
import { scheduleListActions } from '../../store/scheduleList-slice';
import useScheduleMutation from '../../querys/useScheduleMutaion';
import dateToString from '../../utils/dateToString';

interface UrlProp {
  url: string;
}

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
  height: 60%;
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

const ThumbnailBox = styled.div<UrlProp>`
  background-color: ${cssToken.COLOR['gray-300']};
  background-image: url(${(props) => props.url});
  background-size: cover;
  width: ${cssToken.WIDTH['w-full']};
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
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
  const [isThumbChoice, setIsThumbChouce] = useState(false);
  const [choiceDate, setChoiceDate] = useState(new Date());
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const bgUrl = useSelector((state: RootState) => state.scheduleList.imageUrl);
  const destinationList = useSelector(
    (state: RootState) => state.scheduleList.list
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const scheduleMutation = useScheduleMutation();

  const handleSave = () => {
    if (titleRef.current && descriptionRef.current) {
      dispatch(scheduleListActions.addTitle(titleRef.current.value));
      dispatch(
        scheduleListActions.addDescription(descriptionRef.current.value)
      );
      scheduleMutation.mutate({
        courseData: {
          courseDday: `${dateToString(choiceDate)}`,
          courseTitle: titleRef.current.value,
          courseContent: descriptionRef.current.value,
          courseThumbnail: bgUrl,
        },
        destinationList: [...destinationList],
      });
    }
    dispatch(overlayActions.toggleOverlay());
    dispatch(scheduleListActions.resetList());
    navigate('/');
  };

  return (
    <Modal
      styles={{
        width: '65rem',
        height: '40rem',
        borderradius: `${cssToken.BORDER['rounded-s']}`,
      }}
    >
      {isThumbChoice ? (
        <ThumbnailChoiceContainer setIsThumbChouce={setIsThumbChouce} />
      ) : (
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
              <ThumbnailBox url={bgUrl}>
                {!bgUrl && (
                  <Thumbnail style={{ iconWidth: 125, iconHeight: 103 }} />
                )}
                <GrayButton
                  width="150px"
                  height="2rem"
                  borderRadius={cssToken.BORDER['rounded-s']}
                  onClick={() => setIsThumbChouce(true)}
                >
                  썸네일 선택
                </GrayButton>
              </ThumbnailBox>
              <DataChoiceWrapper>
                <div>일정 날짜 선택</div>
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
                ref={titleRef}
                description="일정의 제목을 작성해 주세요. (최대 30자, 필수)"
                minLength={1}
                maxLength={30}
                type="title"
                styles={{
                  width: `${cssToken.WIDTH['w-full']}`,
                  height: `${cssToken.HEIGHT['h-min']}`,
                }}
              />
              <TextArea
                ref={descriptionRef}
                description="일정의 상세 설명을 작성해 주세요. (최대 40자, 필수)"
                minLength={1}
                maxLength={40}
                styles={{
                  width: `${cssToken.WIDTH['w-full']}`,
                  height: `${cssToken.HEIGHT['h-full']}`,
                }}
              />
            </WriteRightBox>
          </WriteContainer>

          <ButtonWrapper>
            <GrayButton
              width="150px"
              height="50px"
              borderRadius={cssToken.BORDER['rounded-md']}
              onClick={() => dispatch(overlayActions.toggleOverlay())}
            >
              뒤로가기
            </GrayButton>
            <SkyBlueButton
              width="150px"
              height="50px"
              borderRadius={cssToken.BORDER['rounded-md']}
              onClick={handleSave}
            >
              저장하기
            </SkyBlueButton>
          </ButtonWrapper>
        </Wrapper>
      )}
    </Modal>
  );
};

export default ScheduleCreateModal;
