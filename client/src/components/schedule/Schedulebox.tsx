import { styled } from 'styled-components';

import cssToken from '../../styles/cssToken';
import SubTitle from '../ui/text/SubTitle';
import Text from '../ui/text/Text';
import GrayButton from '../ui/button/GrayButton';

const ScheduleContainer = styled.section`
  position: fixed;
  left: 0;
  top: 0;
  width: 450px;
  height: 100vh;
  background: #fff;
  z-index: 1;
  padding: 15px;
`;

const ScheduleInfoBox = styled.div`
  margin-bottom: 15px;
  border-bottom: 1px solid #dcdcdc;
`;

const Btnbox = styled.div`
  display: flex;
  gap: 10px;
`;

const ScheduleInfoTxt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
`;

const ScheduleTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ScheduleBox = () => {
  return (
    <ScheduleContainer>
      <ScheduleInfoBox>
        <ScheduleInfoTxt>
          <ScheduleTitle>
            <SubTitle
              styles={{
                size: '1.5rem',
                color: cssToken.COLOR.black,
              }}
            >
              하루일정
            </SubTitle>

            <span>23.07.04</span>
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

      <SubTitle
        styles={{
          size: cssToken.COLOR['gray-900'],
          color: cssToken.COLOR.black,
        }}
      >
        장소 추가
      </SubTitle>

      <Btnbox>
        <GrayButton width="100%" height="50px" borderRadius="10px">
          카테고리 검색
        </GrayButton>
        <GrayButton width="100%" height="50px" borderRadius="10px">
          직접 검색
        </GrayButton>
      </Btnbox>
    </ScheduleContainer>
  );
};

export default ScheduleBox;
