import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { CardCommonBox } from './Card.styled';

import cssToken from '../../../styles/cssToken';
import { ILatLng, MapLocationCardInfo } from '../../../types/type';
import { RootState } from '../../../store';
import Button from '../button/Button';
import Trash from '../../../assets/Trash';
import { scheduleListActions } from '../../../store/scheduleList-slice';
import { markerActions } from '../../../store/marker-slice';
import ThreeLine from '../../../assets/ThreeLine';

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
  background-color: ${cssToken.COLOR.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  width: ${cssToken.WIDTH['w-full']};
  padding: ${cssToken.SPACING['gap-24']} ${cssToken.SPACING['gap-12']}
    ${cssToken.SPACING['gap-24']} ${cssToken.SPACING['gap-16']};
  ${CardCommonBox}
`;

const LocationText = styled.p`
  font-size: ${cssToken.TEXT_SIZE['text-18']};
  font-weight: ${cssToken.FONT_WEIGHT.medium};
`;

const RightButtonArea = styled.section`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const MapLocationCard = ({
  indexNum,
  location,
  latlng,
  id,
  type,
}: MapLocationCardInfo) => {
  const index = indexNum ?? -1;
  const markerId = useSelector((state: RootState) => state.marker.markerId);
  const selected = !!(id && id === markerId);

  const dispatch = useDispatch();

  const handleHighlight = () => {
    if (id && latlng)
      dispatch(markerActions.selectMarker({ markerId: id, center: latlng }));
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
          handleHighlight();
        }}
      >
        <LocationText>{location}</LocationText>
        <RightButtonArea>
          {type && <ThreeLine style={{ iconWidth: 17, iconHeight: 18 }} />}
          <Button
            onClick={() => {
              if (id) handleDelete(id);
            }}
          >
            {type && <Trash style={{ iconWidth: 16, iconHeight: 18 }} />}
          </Button>
        </RightButtonArea>
      </LocationCard>
    </MapLocationCardContainer>
  );
};

export default MapLocationCard;
