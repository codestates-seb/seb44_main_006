import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { memo, useEffect, useRef } from 'react';

import { FlexDiv } from '../../styles/styles';
import KakaoMap from '../map/KakaoMap';
import Marker from '../map/Marker';
import Polyline from '../map/Polyline';
import cssToken from '../../styles/cssToken';
import Title from '../ui/text/Title';
import MapLocationCard from '../ui/cards/MapLocationCard';
import { IScheduleListItem } from '../../types/type';
import makePolyline from '../../utils/makePolyline';
import { markerActions } from '../../store/marker-slice';
import usePanMap from '../../hooks/usePanMap';
import useCourseListScroll from '../../hooks/useCourseListScroll';

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
  const scrollRef = useRef<HTMLDivElement>(null);
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
    return () => {
      dispatch(markerActions.reset());
    };
  }, [destinationList, dispatch]);

  usePanMap();
  useCourseListScroll({
    element: scrollRef.current,
    clientHeight: scrollRef.current
      ? scrollRef.current.offsetHeight
      : undefined,
  });

  return (
    <OutsideWrapper>
      <ScheduleDiv>
        <Title styles={{ size: cssToken.TEXT_SIZE['text-24'] }}>
          {title || ''}
        </Title>
        <LocationCardWrapper ref={scrollRef}>
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
