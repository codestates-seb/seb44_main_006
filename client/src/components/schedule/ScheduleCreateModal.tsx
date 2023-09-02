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
import InputContainer from '../ui/input/InputContainer';
import TextArea from '../ui/input/TextArea';
import 'react-datepicker/dist/react-datepicker.css';
import { overlayActions } from '../../store/overlay-slice';
import { RootState } from '../../store';
import { scheduleListActions } from '../../store/scheduleList-slice';
import useScheduleMutation from '../../querys/useScheduleMutaion';
import dateToString from '../../utils/dateToString';
import { placeListActions } from '../../store/placeList-slice';
import GrayButton from '../ui/button/GrayButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import { Thumbnail } from '../../assets/Thumbnail';
import { PostReadT } from '../../types/apitype';

interface UrlProp {
  url: string | undefined;
}
interface WrapperProp {
  display: string;
}

const ResponsiveWrapper = styled.article`
  @media (max-width: 768px) {
    > section {
      width: ${cssToken.WIDTH['w-screen']};
      height: ${cssToken.HEIGHT['h-screen']};
    }
  }
`;

const Wrapper = styled.div<WrapperProp>`
  width: ${cssToken.WIDTH['w-full']};
  height: ${cssToken.HEIGHT['h-full']};
  display: ${(props) => props.display};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${cssToken.SPACING['gap-50']};

  @media (max-width: 768px) {
    height: ${cssToken.HEIGHT['h-screen']};
    gap: 1rem;
    justify-content: flex-start;
  }
`;

const TitleContainer = styled.section`
  width: 95%;
  display: flex;
  flex-direction: column;
  gap: ${cssToken.SPACING['gap-10']};

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 1.25rem;
    row-gap: 3px;

    > h1 {
      font-size: 1.25rem;
    }
    > h3 {
      font-size: 0.8125rem;
    }
  }
`;

const WriteContainer = styled.section`
  width: ${cssToken.WIDTH['w-full']};
  height: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${cssToken.SPACING['gap-24']};
    height: auto;
    margin-bottom: 1rem;
  }
`;

const WriteLeftBox = styled.section`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
    gap: ${cssToken.SPACING['gap-12']};
    justify-content: normal;
  }
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

  @media (max-width: 480px) {
    padding: 1rem;
    height: 0%;
    padding-bottom: 70%;
    position: relative;
    gap: ${cssToken.SPACING['gap-12']};
    > svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const SelfEnd = styled.div<{ bgUrl: boolean }>`
  height: ${(props) => (props.bgUrl ? '100%' : '')};
  display: flex;
  align-items: end;
  padding-bottom: ${(props) =>
    props.bgUrl ? cssToken.SPACING['gap-50'] : '0rem'};

  @media (max-width: 480px) {
    padding-bottom: 0%;
    position: absolute;
    bottom: 30px;
  }
`;

const DataChoiceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${cssToken.SPACING['gap-24']};

  @media (max-width: 768px) {
    gap: ${cssToken.SPACING['gap-12']};
    flex-direction: column;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    flex-direction: row;
  }
`;

const WriteRightBox = styled.section`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: 768px) {
    input {
      font-size: 0.8rem;
    }

    textarea {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${cssToken.SPACING['gap-12']};
`;

const DateInputBox = styled(DatePicker)`
  border: solid 1px ${cssToken.COLOR['gray-600']};
  padding: 0.5rem;
  text-align: center;
`;

const ScheduleCreateModal = ({
  ismodify,
  courseId,
  courseData,
}: {
  ismodify: boolean;
  courseId: string;
  courseData: PostReadT['courseData'] | undefined;
}) => {
  const [isThumbChoice, setIsThumbChouce] = useState(false);
  const [choiceDate, setChoiceDate] = useState(new Date());
  const [titleIsValidate, setTitleIsValidate] = useState(false);
  const [descIsValidate, setDescIsValidate] = useState(false);

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
      if (!titleIsValidate || !descIsValidate) return;

      setTitleIsValidate(true);
      setDescIsValidate(true);

      if (ismodify) {
        scheduleMutation.mutate({
          courseData: {
            courseDday: `${dateToString(choiceDate)}`,
            courseTitle: titleRef.current.value,
            courseContent: descriptionRef.current.value,
            courseThumbnail: bgUrl,
          },
          destinationList: [...destinationList],
          type: 'patch',
          courseId,
        });
      } else {
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
      dispatch(placeListActions.resetList());
      navigate('/mypage');
    }
  };

  const handleChange = () => {
    if (titleRef.current && descriptionRef.current) {
      if (titleRef.current.value.length === 0) {
        setTitleIsValidate(false);
      } else {
        setTitleIsValidate(true);
      }

      if (descriptionRef.current.value.length === 0) {
        setDescIsValidate(false);
      } else {
        setDescIsValidate(true);
      }
    }
  };

  return (
    <ResponsiveWrapper>
      <Modal
        className={['', 'fullModal']}
        styles={{
          width: '65rem',
          height: '40rem',
          borderradius: `${cssToken.BORDER['rounded-s']}`,
          position: 'relative',
        }}
      >
        <ThumbnailChoiceContainer
          setIsThumbChouce={setIsThumbChouce}
          display={isThumbChoice ? 'flex' : 'none'}
        />
        <Wrapper display={isThumbChoice ? 'none' : 'flex'}>
          <TitleContainer>
            <Title styles={{ size: `${cssToken.TEXT_SIZE['text-32']}` }}>
              {ismodify ? '일정 수정하기' : '일정 저장하기'}
            </Title>
            <SubTitle styles={{ weight: 300 }}>
              {`일정 ${ismodify ? '수정' : '저장'} 시 주요 내용을 작성해 주세요!`}
            </SubTitle>
          </TitleContainer>

          <WriteContainer>
            <WriteLeftBox>
              <ThumbnailBox url={bgUrl || courseData?.courseThumbnail}>
                {!(bgUrl || courseData?.courseThumbnail) && (
                  <Thumbnail style={{ iconWidth: 125, iconHeight: 103 }} />
                )}
                <SelfEnd bgUrl={!!bgUrl}>
                  <GrayButton
                    width="150px"
                    height="2rem"
                    brradius={cssToken.BORDER['rounded-s']}
                    onClick={() => setIsThumbChouce(true)}
                  >
                    썸네일 선택
                  </GrayButton>
                </SelfEnd>
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
            <WriteRightBox onChange={handleChange}>
              <InputContainer
                ref={titleRef}
                defaultValue={courseData?.courseTitle}
                description="일정의 제목을 작성해 주세요."
                minLength={1}
                maxLength={30}
                isValidate={titleIsValidate}
                type="title"
                styles={{
                  width: `${cssToken.WIDTH['w-full']}`,
                  height: `${cssToken.HEIGHT['h-min']}`,
                }}
              />
              <TextArea
                ref={descriptionRef}
                defaultValue={courseData?.courseContent}
                description="일정의 상세 설명을 작성해 주세요."
                minLength={1}
                maxLength={40}
                isValidate={descIsValidate}
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
              brradius={cssToken.BORDER['rounded-md']}
              onClick={() => dispatch(overlayActions.toggleOverlay())}
            >
              뒤로가기
            </GrayButton>
            <SkyBlueButton
              width="150px"
              height="50px"
              brradius={cssToken.BORDER['rounded-md']}
              onClick={handleSave}
            >
              {ismodify ? '수정하기' : '저장하기'}
            </SkyBlueButton>
          </ButtonWrapper>
        </Wrapper>
      </Modal>
    </ResponsiveWrapper>
  );
};

export default ScheduleCreateModal;
