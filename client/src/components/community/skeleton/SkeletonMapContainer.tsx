import { styled } from 'styled-components';

import cssToken from '../../../styles/cssToken';
import { FlexDiv } from '../../../styles/styles';
import SkeletonMap from '../../skeleton/SkeletonMap';

const MapContainerDiv = styled(FlexDiv)`
  width: 100%;
  flex: 3;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    &.skeletonScheduleDiv {
      height: 38.875rem;
      row-gap: ${cssToken.SPACING['gap-12']};
    }

    .skeletonMapTitle {
      width: 8rem;
      height: 1.25rem;
    }

    .skeletonMap {
      margin-left: 0px;
      height: calc(var(--vh, 1vh) * 50);
    }
  }
`;

const SkeletonMapContainer = () => {
  return (
    <MapContainerDiv className="skeletonScheduleDiv">
      <SkeletonMap />
    </MapContainerDiv>
  );
};

export default SkeletonMapContainer;
