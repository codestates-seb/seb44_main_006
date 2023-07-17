const panTo = ({
  map,
  newCenter,
}: {
  map: kakao.maps.Map;
  newCenter: { lat: string; lng: string };
}) => {
  const moveLatlng = new kakao.maps.LatLng(
    Number(newCenter.lat),
    Number(newCenter.lng)
  );
  map.panTo(moveLatlng);
};

export default panTo;
