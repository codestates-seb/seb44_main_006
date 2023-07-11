import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';

import { Props, TextareaT } from '../../types/type';
import defaultOptions from '../../utils/constant/constant';
import { mapActions } from '../../store/map-slice';

const MapContainer = styled.section<TextareaT>`
  width: ${(props) => props.width || '100vw'};
  height: ${(props) => props.height || '100vh'};
`;

type KakaoMapT = {
  width: string;
  height: string;
  children: Props['children'];
  center?: { lat: string; lng: string; level: number };
};
const KakaoMap = ({
  center,
  width,
  height,
  children,
  ...options
}: KakaoMapT) => {
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const loadHandler = useCallback(
    (element: HTMLElement) => {
      if (!kakao || !element) return;
      const { level = 3, lat, lng } = center ?? defaultOptions;
      const newMap = new kakao.maps.Map(element, {
        level,
        center: new kakao.maps.LatLng(Number(lat), Number(lng)),
      });
      dispatch(mapActions.setMap(newMap));
      setState(true);
    },
    [dispatch, center]
  );
  return (
    <MapContainer width={width} height={height} ref={loadHandler} {...options}>
      {state && children}
    </MapContainer>
  );
};

export default React.memo(KakaoMap);
