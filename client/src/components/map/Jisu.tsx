import { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';

import { Props, TextareaT } from '../../types/type';
import defaultOptions from '../../utils/constant';
import { mapActions } from '../../store/map-slice';

const MapContainer = styled.section<TextareaT>`
  width: ${(props) => props.width || '100vw'};
  height: ${(props) => props.height || '100vh'};
  position: relative;
`;

const { kakao } = window;

type KakaoMapT = {
  width: string;
  height: string;
  children: Props['children'];
};

const KakaoMap = ({ width, height, children, ...options }: KakaoMapT) => {
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const loadHandler = useCallback(
    (element: HTMLElement) => {
      if (!kakao || !element) return;
      const { level, lat, lng } = defaultOptions;
      const newMap = new kakao.maps.Map(element, {
        level,
        center: new kakao.maps.LatLng(lat, lng),
      });
      dispatch(mapActions.setMap(newMap));
      setState(true);
    },
    [dispatch]
  );

  return (
    <MapContainer width={width} height={height} ref={loadHandler} {...options}>
      {state && children}
    </MapContainer>
  );
};

export default KakaoMap;
