import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { RootState } from '../store';
import panTo from '../utils/panTo';

const usePanMap = () => {
  const map = useSelector((state: RootState) => state.map.map);
  const newCenter = useSelector((state: RootState) => state.marker.center);

  useEffect(() => {
    if (map && newCenter.lat && newCenter.lng) {
      panTo({ map, newCenter });
    }
  }, [map, newCenter, newCenter.lat, newCenter.lng]);
};

export default usePanMap;
