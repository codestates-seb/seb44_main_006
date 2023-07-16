import { styled } from 'styled-components';
import { memo } from 'react';

import Text from '../../ui/text/Text';
import cssToken from '../../../styles/cssToken';
import { FlexDiv } from '../../../styles/styles';

const InfoDiv = styled(FlexDiv)`
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;

  @media screen and (max-width: 768px) {
    height: 2.5625rem;
    p {
      height: 1.125rem;
      display: flex;
      align-items: center;
    }
  }
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

export default memo(InfoContainer);
