import { styled } from 'styled-components';

import Text from '../../ui/text/Text';
import cssToken from '../../../styles/cssToken';
import { FlexDiv } from '../../../styles/styles';

const InfoDiv = styled(FlexDiv)`
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;
`;
const InfoContainer = ({ writer, date }: { writer: string; date: string }) => {
  return (
    <InfoDiv>
      <Text
        styles={{
          size: cssToken.TEXT_SIZE['text-24'],
        }}
      >
        {writer}
      </Text>
      <Text
        styles={{
          size: cssToken.TEXT_SIZE['text-18'],
          weight: cssToken.FONT_WEIGHT.light,
        }}
      >
        {date}
      </Text>
    </InfoDiv>
  );
};

export default InfoContainer;
