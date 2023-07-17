import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { memo, useEffect } from 'react';

import SkeletonMapContainer from './skeleton/SkeletonMapContainer';

import { FlexDiv } from '../../styles/styles';
import KakaoMap from '../map/KakaoMap';
import Marker from '../map/Marker';
import Polyline from '../map/Polyline';
import cssToken from '../../styles/cssToken';
import Title from '../ui/text/Title';
import MapLocationCard from '../ui/cards/MapLocationCard';
import { IScheduleListItem } from '../../types/type';
import makePolyline from '../../utils/makePolyline';
import { RootState } from '../../store';
import { markerActions } from '../../store/marker-slice';
import usePanMap from '../../hooks/usePanMap';

const OutsideWrapper = styled(FlexDiv)`
  @media screen and (max-width: 768px) {
    flex-direction: column;
    row-gap: ${cssToken.SPACING['gap-20']};
  }
`;

const ScheduleDiv = styled(FlexDiv)`
  flex-direction: column;
  flex: 1;
  row-gap: ${cssToken.SPACING['gap-12']};
  height: 60vh;

  @media screen and (max-width: 768px) {
    max-height: 60vh;
    h1 {
      font-size: 1.125rem;
    }
  }
`;

const MapDiv = styled.div`
  margin-left: ${cssToken.SPACING['gap-24']};
  flex: 3;

  @media screen and (max-width: 768px) {
    margin-left: 0px;
    order: -1;
  }
`;

const LocationCardWrapper = styled.div`
  overflow: auto;
`;

const MapContainer = ({
  destinationList,
  title,
}: {
  destinationList: IScheduleListItem[];
  title: string;
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      markerActions.setInitialCenter({
        lat: destinationList[0].y,
        lng: destinationList[0].x,
        level: 6,
      })
    );
    dispatch(
      markerActions.selectMarker({
        markerId: '',
        center: {
          lat: '',
          lng: '',
        },
      })
    );
  }, [destinationList, dispatch]);

  usePanMap();

  return (
    <OutsideWrapper>
      <ScheduleDiv>
        <Title styles={{ size: cssToken.TEXT_SIZE['text-24'] }}>
          {title || ''}
        </Title>
        <LocationCardWrapper>
          {destinationList.map((destination, idx) => (
            <MapLocationCard
              key={uuidv4()}
              latlng={{ lat: destination.y, lng: destination.x }}
              id={destination.id}
              indexNum={idx + 1}
              location={destination.placeName}
            />
          ))}
        </LocationCardWrapper>
      </ScheduleDiv>
      <MapDiv>
        <KakaoMap width="100%" height="60vh">
          {destinationList.map((destination, idx) => (
            <Marker
              key={uuidv4()}
              lat={destination.y}
              lng={destination.x}
              id={destination.id ?? ''}
              idx={idx}
            />
          ))}
          <Polyline linePos={makePolyline(destinationList)} />
        </KakaoMap>
      </MapDiv>
    </OutsideWrapper>
  );
};

export default memo(MapContainer);
