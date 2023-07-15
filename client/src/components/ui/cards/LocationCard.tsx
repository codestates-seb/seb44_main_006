import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import { CardCommonBox } from './Card.styled';

import TagButton from '../button/TagButton';
import cssToken from '../../../styles/cssToken';
import { LocationCardInfo } from '../../../types/type';
import { RootState } from '../../../store';
import { markerActions } from '../../../store/marker-slice';

const LocationCardContainer = styled.section<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${cssToken.SPACING['gap-16']};
  gap: ${cssToken.SPACING['gap-10']};
  ${CardCommonBox}
`;

const LocationTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LocationTitle = styled.h4`
  font-size: ${cssToken.TEXT_SIZE['text-18']};
`;

const LocationInfoText = css`
  font-size: ${cssToken.TEXT_SIZE['text-14']};
  color: ${cssToken.COLOR['gray-900']};
`;

const LocationAddress = styled.span`
  ${LocationInfoText}
  padding-bottom: ${cssToken.SPACING['gap-24']};
`;

const LocationPhone = styled.span`
  ${LocationInfoText}
`;

const LocationCard = ({
  id,
  title,
  category,
  address,
  phone,
  onClick,
}: LocationCardInfo) => {
  const cardRef = useRef<HTMLElement>(null);
  const dispatch = useDispatch();
  const selectedId = useSelector((state: RootState) => state.marker.markerId);

  useEffect(() => {
    if (cardRef.current && selectedId === id) {
      dispatch(markerActions.setscroll(cardRef.current.offsetTop));
    }
  }, [dispatch, id, selectedId]);
  return (
    <LocationCardContainer
      ref={cardRef}
      selected={selectedId === id}
      onClick={onClick}
    >
      <LocationTop>
        <LocationTitle>{title}</LocationTitle>
        <TagButton>{category}</TagButton>
      </LocationTop>

      <LocationAddress>{address}</LocationAddress>
      <LocationPhone>{phone}</LocationPhone>
    </LocationCardContainer>
  );
};

export default LocationCard;
