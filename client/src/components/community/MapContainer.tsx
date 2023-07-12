import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { memo } from 'react';

import { FlexDiv } from '../../styles/styles';
import KakaoMap from '../map/KakaoMap';
import Marker from '../map/Marker';
import Polyline from '../map/Polyline';
import cssToken from '../../styles/cssToken';
import Title from '../ui/text/Title';
import MapLocationCard from '../ui/cards/MapLocationCard';
import { IScheduleListItem, IdT } from '../../types/type';
import makePolyline from '../../utils/makePolyline';
import { markerActions } from '../../store/marker-slice';

const ScheduleDiv = styled(FlexDiv)`
  flex-direction: column;
  flex: 1;
  margin-left: ${cssToken.SPACING['gap-24']};
  row-gap: ${cssToken.SPACING['gap-12']};
  height: 60vh;
`;

const MapDiv = styled.div`
  flex: 3;
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
  const handleHighlight = ({ id }: { id: IdT }) => {
    dispatch(markerActions.selectMarker(id));
  };
  return (
    <FlexDiv>
      <MapDiv>
        <KakaoMap
          center={{
            lat: destinationList[0].y,
            lng: destinationList[0].x,
            level: 3,
          }}
          width="100%"
          height="60vh"
        >
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
      <ScheduleDiv>
        <Title styles={{ size: cssToken.TEXT_SIZE['text-24'] }}>
          {title || ''}
        </Title>
        <LocationCardWrapper>
          {destinationList.map((destination, idx) => (
            <MapLocationCard
              key={uuidv4()}
              id={destination.id}
              indexNum={idx + 1}
              location={destination.placeName}
              onClick={handleHighlight}
            />
          ))}
        </LocationCardWrapper>
      </ScheduleDiv>
    </FlexDiv>
  );
};

export default memo(MapContainer);
