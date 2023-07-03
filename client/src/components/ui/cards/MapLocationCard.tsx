import styled from 'styled-components';

import cssToken from '../../../styles/cssToken';

const MapLocationCardContainer = styled.section`
  display: flex;
  align-items: center;
  gap: ${cssToken.SPACING['gap-10']};
  cursor: pointer;
  transition: ${cssToken.TRANSITION.basic};
`;

const NumCircle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${cssToken.COLOR.white};
  border-radius: ${cssToken.BORDER['rounded-full']};
  width: 35px;
  height: 35px;
  background-color: ${cssToken.COLOR['point-900']};
`;

const LocationCard = styled.div`
  flex: 1;
  width: ${cssToken.WIDTH['w-full']};
  padding: ${cssToken.SPACING['gap-24']};
  border: 0.0625rem solid ${cssToken.COLOR['gray-500']};
  border-radius: ${cssToken.BORDER['rounded-md']};
  &:hover {
    border: 0.0625rem solid ${cssToken.COLOR['point-900']};
  }
`;

const LocationText = styled.p`
  font-size: ${cssToken.TEXT_SIZE['text-18']};
  font-weight: ${cssToken.FONT_WEIGHT.medium};
`;

const MapLocationCard = () => {
  return (
    <MapLocationCardContainer>
      <NumCircle>1</NumCircle>
      <LocationCard>
        <LocationText>구림 빌라</LocationText>
      </LocationCard>
    </MapLocationCardContainer>
  );
};

export default MapLocationCard;
