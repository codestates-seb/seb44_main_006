import styled from 'styled-components';

import { CardCommonBox } from './Card.styled';

import cssToken from '../../../styles/cssToken';

interface MapLocationCardInfo {
  indexNum?: number;
  location?: string;
}

const MapLocationCardContainer = styled.section`
  display: flex;
  align-items: center;
  gap: ${cssToken.SPACING['gap-10']};
  cursor: pointer;
`;

const NumCircle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${cssToken.COLOR.white};
  border-radius: ${cssToken.BORDER['rounded-full']};
  width: 2.1875rem;
  height: 2.1875rem;
  background-color: ${cssToken.COLOR['point-900']};
`;

const LocationCard = styled.div`
  flex: 1;
  width: ${cssToken.WIDTH['w-full']};
  padding: ${cssToken.SPACING['gap-24']};
  ${CardCommonBox}
`;

const LocationText = styled.p`
  font-size: ${cssToken.TEXT_SIZE['text-18']};
  font-weight: ${cssToken.FONT_WEIGHT.medium};
`;

const MapLocationCard = ({ indexNum, location }: MapLocationCardInfo) => {
  return (
    <MapLocationCardContainer>
      <NumCircle>{indexNum}</NumCircle>
      <LocationCard>
        <LocationText>{location}</LocationText>
      </LocationCard>
    </MapLocationCardContainer>
  );
};

export default MapLocationCard;
