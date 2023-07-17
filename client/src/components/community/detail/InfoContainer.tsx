import { styled } from 'styled-components';
import { memo } from 'react';

import Text from '../../ui/text/Text';
import cssToken from '../../../styles/cssToken';
import { FlexDiv } from '../../../styles/styles';
import thousandTok from '../../../utils/thousandTok';

const InfoDiv = styled(FlexDiv)`
  width: 80%;
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

const DateViewCountDiv = styled(FlexDiv)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 1050px) {
    flex-direction: column;
  }

  @media screen and (max-width: 768px) {
    flex-direction: row;
  }
`;

const InfoContainer = ({
  writer,
  date,
  viewCount,
}: {
  writer: string;
  date: string;
  viewCount: number;
}) => {
  return (
    <InfoDiv>
      <Text
        styles={{
          size: cssToken.TEXT_SIZE['text-24'],
        }}
      >
        {writer}
      </Text>
      <DateViewCountDiv>
        <Text
          styles={{
            size: cssToken.TEXT_SIZE['text-18'],
            weight: cssToken.FONT_WEIGHT.light,
          }}
        >
          {date}
        </Text>

        <Text
          styles={{
            weight: cssToken.FONT_WEIGHT.light,
          }}
        >
          조회수 {thousandTok(viewCount)}
        </Text>
      </DateViewCountDiv>
    </InfoDiv>
  );
};

export default memo(InfoContainer);
