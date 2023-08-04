import { styled } from 'styled-components';

import Text from './text/Text';

import { FlexDiv } from '../../styles/styles';
import cssToken from '../../styles/cssToken';
import { NoresultResult } from '../../assets/NoresultResult';

const Div = styled(FlexDiv)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: ${cssToken.SPACING['gap-40']};
`;

const Noresult = ({
  iconWidth,
  iconHeight,
  size,
}: {
  iconWidth: number;
  iconHeight: number;
  size: string;
}) => {
  return (
    <Div>
      <NoresultResult style={{ iconWidth, iconHeight }} />
      <Text styles={{ size, color: '#c9c9c9' }}>검색 결과 없습니다.</Text>
    </Div>
  );
};

export default Noresult;
