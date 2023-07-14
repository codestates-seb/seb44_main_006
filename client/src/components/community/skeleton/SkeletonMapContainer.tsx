import { styled } from 'styled-components';

import SkeletonLocationContainer from './SkeletonLocationContainer';

import cssToken from '../../../styles/cssToken';
import { FlexDiv } from '../../../styles/styles';
import { TitleDiv } from '../../skeleton/SkeletonContentCard';
import SkeletonMap from '../../skeleton/SkeletonMap';

const ScheduleDiv = styled(FlexDiv)`
  flex-direction: column;
  flex: 1;
  height: 60vh;
  overflow: auto;
  row-gap: ${cssToken.SPACING['gap-12']};
`;

const SkeletonMapContainer = () => {
  return (
    <FlexDiv>
      <ScheduleDiv>
        <TitleDiv />
        <SkeletonLocationContainer length={3} />
      </ScheduleDiv>
      <SkeletonMap />
    </FlexDiv>
  );
};

export default SkeletonMapContainer;
