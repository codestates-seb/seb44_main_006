import { styled } from 'styled-components';

import { FlexDiv } from '../../styles/styles';
import cssToken from '../../styles/cssToken';

const Div = styled(FlexDiv)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: ${cssToken.SPACING['gap-40']};
`;

const NoResults = () => {
  return (
    <Div>
      <img width="40%" src="noresults.jpg" alt="noresults" />
    </Div>
  );
};

export default NoResults;
