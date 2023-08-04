import styled from 'styled-components';
import { SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import cssToken from '../../styles/cssToken';
import Title from '../ui/text/Title';
import SubTitle from '../ui/text/SubTitle';
import imageUrl from '../../utils/constant/imageUrl';
import { ImageCard } from '../ui/cards/index';
import { RootState } from '../../store';
import { selectedIdActions } from '../../store/selectedId-slice';
import { scheduleListActions } from '../../store/scheduleList-slice';
import GrayButton from '../ui/button/GrayButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';

interface IDisplay {
  display: string;
}
interface Prop {
  setIsThumbChouce: React.Dispatch<SetStateAction<boolean>>;
  display: string;
}

const Wrapper = styled.div<IDisplay>`
  width: ${cssToken.WIDTH['w-full']};
  height: ${cssToken.HEIGHT['h-full']};
  display: ${(props) => props.display};
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

const ImageContainer = styled.section`
  width: ${cssToken.WIDTH['w-full']};
  height: 60%;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: ${cssToken.SPACING['gap-16']};
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${cssToken.SPACING['gap-12']};
`;

const ThumbnailChoiceContainer = ({ setIsThumbChouce, display }: Prop) => {
  const dispatch = useDispatch();
  const selectedId = useSelector(
    (state: RootState) => state.selectedId.thumbnailId
  );

  const handleClick = (id: string, url: string) => {
    if (id) {
      dispatch(selectedIdActions.setThumbnailId(id));
      dispatch(scheduleListActions.addImage(url));
    }
  };

  return (
    <Wrapper display={display}>
      <TitleContainer>
        <Title styles={{ size: `${cssToken.TEXT_SIZE['text-32']}` }}>
          썸네일 선택하기
        </Title>
        <SubTitle styles={{ weight: 300 }}>
          원하는 썸네일을 선택해주세요!
        </SubTitle>
      </TitleContainer>

      <ImageContainer>
        {imageUrl.map((url, idx) => (
          <ImageCard
            key={url}
            id={`${idx}`}
            url={url}
            selectedid={selectedId}
            onClick={handleClick}
          />
        ))}
      </ImageContainer>

      <ButtonContainer>
        <GrayButton
          width="150px"
          height="50px"
          brradius={cssToken.BORDER['rounded-md']}
          onClick={() => setIsThumbChouce(false)}
        >
          뒤로가기
        </GrayButton>
        <SkyBlueButton
          width="150px"
          height="50px"
          brradius={cssToken.BORDER['rounded-md']}
          onClick={() => setIsThumbChouce(false)}
        >
          선택하기
        </SkyBlueButton>
      </ButtonContainer>
    </Wrapper>
  );
};

export default ThumbnailChoiceContainer;
