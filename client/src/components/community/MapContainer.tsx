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
  overflow-y: scroll;
  flex: 1;
  margin-left: ${cssToken.SPACING['gap-24']};
  gap: ${cssToken.SPACING['gap-10']};
`;

const MapDiv = styled.div`
  flex: 3;
`;

const MapContainer = ({ array }: { array: { lat: number; lng: number }[] }) => {
  return (
    <FlexDiv>
      <MapDiv>
        <KakaoMap width="100%" height="50vh">
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
        <>
          <MapLocationCard indexNum={1} location="this is red too" />
          <MapLocationCard indexNum={2} location="길막마전부타비켜" />
          <MapLocationCard indexNum={3} location="여긴어디나는누구" />
          <MapLocationCard
            indexNum={4}
            location="여름이었다가을이었다겨울이었다봄이었다여름이었다가을이었다겨"
          />
        </>
      </ScheduleDiv>
    </FlexDiv>
  );
};

export default MapContainer;
