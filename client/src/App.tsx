import KakaoMap from './components/map/Jisu';
import Marker from './components/map/Marker';
import Polyline from './components/map/Polyline';

const App = () => {
  const array = [
    { lat: 33.450701, lng: 126.570667 },
    { lat: 33.450701, lng: 126.570867 },
  ];

  return (
    <KakaoMap width="100vw" height="100vh">
      {/* id가 index가 아니라 고유한 값이어야함. */}
      {array.map((pos, idx) => (
        <Marker key={idx} lat={pos.lat} lng={pos.lng} id={idx} />
      ))}
      <Polyline linePos={array} />
    </KakaoMap>
  );
};

export default App;
