import { styled } from 'styled-components';

import { FlexDiv } from '../../styles/styles';
import KakaoMap from '../map/KakaoMap';
import Marker from '../map/Marker';
import Polyline from '../map/Polyline';
import cssToken from '../../styles/cssToken';
import Title from '../ui/text/Title';
import MapLocationCard from '../ui/cards/MapLocationCard';
import { IScheduleListItem } from '../../types/type';
import makePolyline from '../../utils/makePolyline';

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
  overflow-y: scroll;
`;

const MapContainer = ({
  destinationList,
  title,
}: {
  destinationList: IScheduleListItem[];
  title: string;
}) => {
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
              key={idx}
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
              key={idx}
              indexNum={idx + 1}
              location={destination.placeName}
            />
          ))}
        </LocationCardWrapper>
      </ScheduleDiv>
    </FlexDiv>
  );
};

export default MapContainer;
