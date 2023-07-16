import { styled } from 'styled-components';

import SkeletonLocationContainer from './SkeletonLocationContainer';

import cssToken from '../../../styles/cssToken';
import { FlexDiv } from '../../../styles/styles';
import { TitleDiv } from '../../skeleton/SkeletonContentCard';
import SkeletonMap from '../../skeleton/SkeletonMap';

const MapContainerDiv = styled(FlexDiv)`
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
      flex: 1;
      order: -1;
      height: 60vh;
    }
  }
`;

const ScheduleDiv = styled(FlexDiv)`
  flex-direction: column;
  flex: 1;
  height: 60vh;
  overflow: auto;
  row-gap: ${cssToken.SPACING['gap-12']};
`;

const SkeletonMapContainer = () => {
  return (
    <MapContainerDiv className="skeletonScheduleDiv">
      <ScheduleDiv>
        <TitleDiv className="skeletonMapTitle" />
        <SkeletonLocationContainer length={3} />
      </ScheduleDiv>
      <SkeletonMap />
    </MapContainerDiv>
  );
};

export default SkeletonMapContainer;
