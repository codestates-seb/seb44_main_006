import Title from '../ui/text/Title';
import Text from '../ui/text/Text';
import { HeadDiv } from '../../styles/styles';
import cssToken from '../../styles/cssToken';

const Head = () => {
  return (
    <HeadDiv>
      <Title styles={{ size: cssToken.TEXT_SIZE['text-40'] }}>
        나의 코스 자랑하기
      </Title>
      <Text
        styles={{
          size: cssToken.TEXT_SIZE['text-18'],
          color: cssToken.COLOR['gray-900'],
          weight: cssToken.FONT_WEIGHT.medium,
        }}
      >
        자랑할 일정을 선택해주세요.
      </Text>
    </HeadDiv>
  );
};

export default Head;
