import { styled } from 'styled-components';

import { SkeletonDiv } from '../../styles/styles';
import cssToken from '../../styles/cssToken';

const MapDiv = styled(SkeletonDiv)`
  border-radius: 0rem;
  margin-left: ${cssToken.SPACING['gap-24']};
  flex: 3;
  height: 60vh;
`;
const SkeletonMap = () => {
  return <MapDiv />;
};

export default SkeletonMap;
