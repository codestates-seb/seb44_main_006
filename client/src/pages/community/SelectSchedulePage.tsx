import { styled } from 'styled-components';

import Title from '../../components/ui/text/Title';
import cssToken from '../../styles/cssToken';
import Text from '../../components/ui/text/Text';
import { FlexDiv } from '../../styles/styles';

const OutsideWrap = styled.div`
  height: 100vh;
`;

const HeadDiv = styled(FlexDiv)`
  flex-direction: column;
  row-gap: 3px;
`;

const SelectSchedulePage = () => {
  return (
    <OutsideWrap>
      <HeadDiv>
        <Title styles={{ size: cssToken.TEXT_SIZE['text-40'] }}>
          나의 코스 자랑하기
        </Title>
        <Text
          styles={{
            size: cssToken.TEXT_SIZE['text-18'],
            color: cssToken.COLOR['gray-900'],
          }}
        >
          자랑할 일정을 선택해주세요.
        </Text>
      </HeadDiv>
    </OutsideWrap>
  );
};

export default SelectSchedulePage;
