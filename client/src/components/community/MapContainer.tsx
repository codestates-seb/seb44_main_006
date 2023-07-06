import { styled } from 'styled-components';

import { FlexDiv } from '../../styles/styles';
import KakaoMap from '../map/KakaoMap';
import Marker from '../map/Marker';
import Polyline from '../map/Polyline';
import cssToken from '../../styles/cssToken';
import Title from '../ui/text/Title';
import MapLocationCard from '../ui/cards/MapLocationCard';

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

const MapContainer = ({ array }: { array: { lat: number; lng: number }[] }) => {
  return (
    <FlexDiv>
      <MapDiv>
        <KakaoMap width="100%" height="60vh">
          {array.map((pos, idx) => (
            <Marker key={idx} lat={pos.lat} lng={pos.lng} id={idx} />
          ))}
          <Polyline linePos={array} />
        </KakaoMap>
      </MapDiv>
      <ScheduleDiv>
        <Title styles={{ size: cssToken.TEXT_SIZE['text-24'] }}>
          제목이들어갈겁니다제목이들어갈겁니다제목이들어갈겁니다제목이들어갈겁니다제목이들어갈겁니다
        </Title>
        <LocationCardWrapper>
          <MapLocationCard indexNum={1} location="this is red too" />
          <MapLocationCard indexNum={2} location="길막마전부타비켜" />
          <MapLocationCard indexNum={3} location="여긴어디나는누구" />
          <MapLocationCard
            indexNum={4}
            location="여름이었다가을이었다겨울이었다봄이었다여름이었다가을이었다겨"
          />
          <MapLocationCard
            indexNum={5}
            location="여름이었다가을이었다겨울이었다봄이었다여름이었다가을이었다겨"
          />
          <MapLocationCard
            indexNum={6}
            location="여름이었다가을이었다겨울이었다봄이었다여름이었다가을이었다겨"
          />
        </LocationCardWrapper>
      </ScheduleDiv>
    </FlexDiv>
  );
};

export default MapContainer;
