import { styled } from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import ScheduleListBox from './ScheduleListBox';
import DirectSearch from './DirectSearch';
import CategorySearch from './CategorySearch';

import cssToken from '../../styles/cssToken';
import SubTitle from '../ui/text/SubTitle';
import Text from '../ui/text/Text';
import GrayButton from '../ui/button/GrayButton';
import { placeListActions } from '../../store/placeList-slice';

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
  justify-content: center;
  gap: ${cssToken.SPACING['gap-10']};

  @media (max-width: 768px) {
    .gray {
      width: 100%;
    }
  }
`;

const ScheduleInfoTxt = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssToken.SPACING['gap-10']};
`;

const ScheduleTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ScheduleBox = () => {
  const [choiceCategory, setChoiceCategory] = useState(false);
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

  return (
    <ScheduleContainer className="scheduleBox">
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
              weight: 300,
            }}
          >
            최대 10개 추가할 수 있습니다.
          </Text>
        </ScheduleInfoTxt>
      </ScheduleInfoBox>

      <ScheduleListBox />

      <Btnbox>
        <GrayButton
          width={cssToken.WIDTH['w-full']}
          height="50px"
          borderRadius="10px"
          isActive={choiceCategory}
          onClick={handleCategory}
        >
          카테고리 검색
        </GrayButton>
        <GrayButton
          width={cssToken.WIDTH['w-full']}
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
