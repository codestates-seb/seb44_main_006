import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';

import { CardCommonBox } from './Card.styled';

import cssToken from '../../../styles/cssToken';
import { MapLocationCardInfo } from '../../../types/type';
import { RootState } from '../../../store';
import Button from '../button/Button';
import { scheduleListActions } from '../../../store/scheduleList-slice';
import { markerActions } from '../../../store/marker-slice';
import Trash from '../../../assets/icons/Trash';
import ThreeLine from '../../../assets/icons/ThreeLine';

const MapLocationCardContainer = styled.section`
  display: flex;
  align-items: center;
  gap: ${cssToken.SPACING['gap-10']};
  cursor: pointer;
  margin-bottom: 15px;

  &:last-child .last-circle::after {
    display: none;
  }

  @media screen and (max-width: 768px) {
    svg {
      width: 13px;
      height: 14px;
    }
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
  background-color: ${cssToken.COLOR['point-500']};
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

  @media screen and (max-width: 768px) {
    font-size: 0.8125rem;
    width: 1.8rem;
    height: 1.8rem;

    &::after {
      height: 100%;
      bottom: -135%;
    }
  }
`;

const LocationCard = styled.div<{ selected?: boolean; type?: string }>`
  background-color: ${cssToken.COLOR.white};
  display: flex;
  justify-content: space-between;
  align-items: ${(props) => (props.type ? 'center' : 'flex-start')};
  flex: 1;
  flex-direction: ${(props) => (props.type ? '' : 'column')};
  width: ${cssToken.WIDTH['w-full']};
  padding: ${cssToken.SPACING['gap-16']} ${cssToken.SPACING['gap-12']}
    ${cssToken.SPACING['gap-16']} ${cssToken.SPACING['gap-16']};
  ${CardCommonBox}

  @media screen and (max-width: 768px) {
    padding: ${cssToken.SPACING['gap-16']} ${cssToken.SPACING['gap-12']}
      ${cssToken.SPACING['gap-16']} ${cssToken.SPACING['gap-12']};
  }
`;

const LocationText = styled.p`
  font-size: ${cssToken.TEXT_SIZE['text-16']};
  font-weight: ${cssToken.FONT_WEIGHT.medium};

  @media screen and (max-width: 768px) {
    font-size: 0.8125rem;
  }
`;

const RightButtonArea = styled.section`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LocationA = styled.a`
  font-size: ${cssToken.TEXT_SIZE['text-12']};
  color: ${cssToken.COLOR['point-500']};
  text-decoration: none;
  margin-top: 0.3125rem;

  &:hover {
    color: ${cssToken.COLOR['point-900']};
  }
`;

export const MapLocationCard = ({
  indexNum,
  location,
  latlng,
  id,
  type,
  place_url,
}: MapLocationCardInfo) => {
  const locationRef = useRef<HTMLDivElement>(null);
  const markerId = useSelector((state: RootState) => state.marker.markerId);
  const dispatch = useDispatch();
  const index = indexNum ?? -1;
  const selected = !!(id && id === markerId);

  useEffect(() => {
    if (locationRef.current && selected)
      dispatch(markerActions.setscroll(locationRef.current.offsetTop));
  }, [dispatch, selected]);

  const handleHighlight = debounce(() => {
    if (id && latlng) {
      dispatch(markerActions.selectMarker({ markerId: id, center: latlng }));
    }
  }, 200);

  const handleDelete = (inputId: string) => {
    dispatch(scheduleListActions.deletePlace(inputId));
  };

  return (
    <MapLocationCardContainer>
      <NumCircle className={index >= 0 ? 'last-circle' : ''}>
        {indexNum}
      </NumCircle>
      <LocationCard
        type={type}
        ref={locationRef}
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
        {!type && (
          <BottomWrapper>
            <LocationA href={place_url} target="_blank" rel="noreferrer">
              자세히 보러가기
            </LocationA>
          </BottomWrapper>
        )}
      </LocationCard>
    </MapLocationCardContainer>
  );
};
