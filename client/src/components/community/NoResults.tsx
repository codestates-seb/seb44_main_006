import { styled } from 'styled-components';

import { FlexDiv } from '../../styles/styles';
import cssToken from '../../styles/cssToken';
import Text from '../ui/text/Text';

const Div = styled(FlexDiv)`
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  row-gap: ${cssToken.SPACING['gap-40']};
`;

const NoResults = () => {
  return (
    <Div>
      <img width="40%" src="noresults.png" alt="noresults" />
      <Text
        styles={{
          size: cssToken.TEXT_SIZE['text-32'],
        }}
      >
        No Results
      </Text>
    </Div>
  );
};

export default NoResults;
