import KakaoMap from './components/map/Jisu';
import Marker from './components/map/Marker';

const App = () => {
  return (
    <KakaoMap width="100vw" height="100vh">
      <Marker />
      <Marker lat={33.450701} lng={126.570867} />
    </KakaoMap>
  );
};

export default App;
