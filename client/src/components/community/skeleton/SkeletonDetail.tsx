import { styled } from 'styled-components';

import SkeletonMapContainer from './SkeletonMapContainer';
import SkeletonUserContainer from './SkeletonUserContainer';

import { FlexDiv } from '../../../styles/styles';

const Wrapper = styled(FlexDiv)`
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const SkeletonDetail = () => {
  return (
    <Wrapper>
      <SkeletonUserContainer />
      <SkeletonMapContainer />
    </Wrapper>
  );
};

export default SkeletonDetail;
