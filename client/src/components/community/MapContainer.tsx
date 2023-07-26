import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { memo, useEffect } from 'react';

import KakaoMap from '../map/KakaoMap';
import Marker from '../map/Marker';
import Polyline from '../map/Polyline';
import cssToken from '../../styles/cssToken';
import { IScheduleListItem } from '../../types/type';
import makePolyline from '../../utils/makePolyline';
import { markerActions } from '../../store/marker-slice';
import usePanMap from '../../hooks/usePanMap';

const MapDiv = styled.div`
  margin-left: ${cssToken.SPACING['gap-24']};
  flex: 3;
  @media screen and (max-width: 768px) {
    margin-top: ${cssToken.SPACING['gap-10']};
    margin-left: 0px;
    > section {
      height: 60vh;
    }
  }
`;

const MapContainer = ({
  destinationList,
}: {
  destinationList: IScheduleListItem[];
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(markerActions.reset());
    dispatch(
      markerActions.setInitialCenter({
        lat: destinationList[0].y,
        lng: destinationList[0].x,
        level: 6,
      })
    );
    return () => {
      dispatch(markerActions.reset());
    };
  }, [destinationList, dispatch]);

  usePanMap();

  return (
    <MapDiv>
      <KakaoMap width="100%" height="80vh">
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
  );
};

export default memo(MapContainer);
