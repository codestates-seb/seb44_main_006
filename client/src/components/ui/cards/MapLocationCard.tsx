import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { CardCommonBox } from './Card.styled';

import cssToken from '../../../styles/cssToken';
import { MapLocationCardInfo } from '../../../types/type';
import { RootState } from '../../../store';
import Button from '../button/Button';
import Trash from '../../../assets/Trash';
import { scheduleListActions } from '../../../store/scheduleList-slice';
import { markerActions } from '../../../store/marker-slice';

const MapLocationCardContainer = styled.section`
  display: flex;
  align-items: center;
  gap: ${cssToken.SPACING['gap-10']};
  cursor: pointer;
  margin-bottom: 15px;

  &:last-child .last-circle::after {
    display: none;
  }
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
  position: relative;
  &::after {
    content: '';
    width: 0.125rem;
    height: ${cssToken.HEIGHT['h-full']};
    border-left: 2px dotted ${cssToken.COLOR['gray-900']};
    position: absolute;
    left: 50%;
    right: 50%;
    bottom: -120%;
    transform: translate(-50%, 0);
  }
`;

const LocationCard = styled.div<{ selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  width: ${cssToken.WIDTH['w-full']};
  padding: ${cssToken.SPACING['gap-24']};
  ${CardCommonBox}
`;

const LocationText = styled.p`
  font-size: ${cssToken.TEXT_SIZE['text-18']};
  font-weight: ${cssToken.FONT_WEIGHT.medium};
`;

const MapLocationCard = ({ indexNum, location, id }: MapLocationCardInfo) => {
  const index = indexNum ?? -1;
  const markerId = useSelector((state: RootState) => state.marker.markerId);
  const selected = !!(id && id === markerId);

  const dispatch = useDispatch();

  const handleHighlight = (inputId: string) => {
    dispatch(markerActions.selectMarker(inputId));
  };

  const handleDelete = (inputId: string) => {
    dispatch(scheduleListActions.deletePlace(inputId));
  };

  return (
    <MapLocationCardContainer>
      <NumCircle className={index >= 0 ? 'last-circle' : ''}>
        {indexNum}
      </NumCircle>
      <LocationCard
        selected={selected}
        onClick={() => {
          if (id) handleHighlight(id);
        }}
      >
        <LocationText>{location}</LocationText>
        <Button
          onClick={() => {
            if (id) handleDelete(id);
          }}
        >
          <Trash style={{ iconWidth: 16, iconHeight: 18 }} />
        </Button>
      </LocationCard>
    </MapLocationCardContainer>
  );
};

export default MapLocationCard;
