import { styled } from 'styled-components';

import { FlexDiv, SkeletonDiv } from '../../styles/styles';
import cssToken from '../../styles/cssToken';

const MapLocationCardContainer = styled(FlexDiv)`
  align-items: center;
  gap: ${cssToken.SPACING['gap-10']};
  cursor: pointer;
  margin-bottom: 15px;
`;

const CircleDiv = styled(SkeletonDiv)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.1875rem;
  height: 2.1875rem;
  border-radius: ${cssToken.BORDER['rounded-full']};
  position: relative;
`;

const ContentDiv = styled(SkeletonDiv)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  width: ${cssToken.WIDTH['w-full']};
  height: 4.5rem;

  @media screen and (max-width: 768px) {
    height: 3rem;
  }
`;

const SkeletonLocationCard = () => {
  return (
    <MapLocationCardContainer>
      <CircleDiv />
      <ContentDiv />
    </MapLocationCardContainer>
  );
};

export default SkeletonLocationCard;
