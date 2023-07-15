import { styled } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ScheduleListBox from './ScheduleListBox';
import DirectSearch from './DirectSearch';
import CategorySearch from './CategorySearch';

import cssToken from '../../styles/cssToken';
import SubTitle from '../ui/text/SubTitle';
import Text from '../ui/text/Text';
import GrayButton from '../ui/button/GrayButton';
import { placeListActions } from '../../store/placeList-slice';
import { RootState } from '../../store';

const ScheduleContainer = styled.section`
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: #fff;
  padding: 15px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: ${cssToken.SPACING['gap-16']};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScheduleInfoBox = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Btnbox = styled.div`
  display: flex;
  gap: 10px;
`;

const ScheduleInfoTxt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ScheduleTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ScheduleBox = () => {
  const scroll = useSelector((state: RootState) => state.marker.scroll);
  const scrollRef = useRef<HTMLElement>(null);
  const [choiceCategory, setChoiceCategory] = useState(true);
  const [choiceDirect, setChoiceDirect] = useState(false);
  const dispatch = useDispatch();

  const handleCategory = () => {
    setChoiceCategory(true);
    setChoiceDirect(false);
    dispatch(placeListActions.resetList());
    dispatch(placeListActions.setIsEmpty(false));
  };

  const handleDirect = () => {
    setChoiceCategory(false);
    setChoiceDirect(true);
    dispatch(placeListActions.resetList());
    dispatch(placeListActions.setIsEmpty(false));
  };

  useEffect(() => {
    if (scroll && scrollRef.current) {
      const moveScroll = document.body.clientHeight / 2;
      scrollRef.current.scrollTo({
        top: scroll - moveScroll,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [scroll]);

  return (
    <ScheduleContainer ref={scrollRef}>
      <ScheduleInfoBox>
        <ScheduleInfoTxt>
          <ScheduleTitle>
            <SubTitle
              styles={{
                size: '1.5rem',
                color: cssToken.COLOR.black,
              }}
            >
              일정 등록
            </SubTitle>
          </ScheduleTitle>

          <Text
            styles={{
              size: '0.85rem',
              color: cssToken.COLOR['gray-900'],
              weight: 500,
            }}
          >
            최대 10개 추가할 수 있습니다.
          </Text>
        </ScheduleInfoTxt>
      </ScheduleInfoBox>

      <ScheduleListBox />

      <Btnbox>
        <GrayButton
          width="100%"
          height="50px"
          borderRadius="10px"
          isActive={choiceCategory}
          onClick={handleCategory}
        >
          카테고리 검색
        </GrayButton>
        <GrayButton
          width="100%"
          height="50px"
          borderRadius="10px"
          isActive={choiceDirect}
          onClick={handleDirect}
        >
          직접 검색
        </GrayButton>
      </Btnbox>
      {choiceCategory && <CategorySearch />}
      {choiceDirect && <DirectSearch />}
    </ScheduleContainer>
  );
};

export default ScheduleBox;
