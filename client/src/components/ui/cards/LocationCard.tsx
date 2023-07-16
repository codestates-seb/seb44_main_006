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

  @media screen and (max-width: 768px) {
  }
`;

const LocationTop = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    > button:first-of-type {
      font-size: ${cssToken.TEXT_SIZE['text-12']};
    }
  }
`;

const LocationTitle = styled.h4`
  flex: 2;
  font-size: ${cssToken.TEXT_SIZE['text-18']};
`;

const LocationInfoText = css`
  font-size: ${cssToken.TEXT_SIZE['text-14']};
  color: ${cssToken.COLOR['gray-900']};

  @media screen and (max-width: 768px) {
    font-size: ${cssToken.TEXT_SIZE['text-12']};
  }
`;

const LocationAddress = styled.span`
  ${LocationInfoText}
`;

const LocationPhone = styled.span`
  ${LocationInfoText}
`;

const LocationA = styled.a`
  font-size: ${cssToken.TEXT_SIZE['text-12']};
  color: ${cssToken.COLOR['point-500']};
  text-decoration: none;
  margin-top: ${cssToken.SPACING['gap-12']};

  &:hover {
    color: ${cssToken.COLOR['point-900']};
  }
`;

const LocationCard = ({
  id,
  title,
  category,
  address,
  phone,
  // onClick,
  place_url,
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
    <LocationCardContainer ref={cardRef} selected={selectedId === id}>
      <LocationTop>
        <LocationTitle>{title}</LocationTitle>
        <TagButton>{category}</TagButton>
      </LocationTop>

      <LocationAddress>{address}</LocationAddress>
      <LocationPhone>{phone}</LocationPhone>

      <LocationA href={place_url} target="_blank" rel="noreferrer">
        자세히 보러가기
      </LocationA>
    </LocationCardContainer>
  );
};

export default LocationCard;
