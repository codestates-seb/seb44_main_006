import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Pagination, PlacesSearchResult } from '../../types/type';
import { placeListActions } from '../../store/placeList-slice';
import { RootState } from '../../store';

const useKeywordSearch = (
  displayPagination: (pagination: Pagination) => void,
  searchPlace: string,
  x?: string,
  y?: string,
  radius?: number
) => {
  const map = useSelector((state: RootState) => state.map.map);
  const dispatch = useDispatch();

  const placesSearchCB = (
    datas: PlacesSearchResult,
    status: string,
    pagination: Pagination
  ) => {
    if (status === kakao.maps.services.Status.OK) {
      const bounds = new kakao.maps.LatLngBounds();
      for (let i = 0; i < datas.length; i += 1) {
        const data = datas[i];
        const [dx, dy] = [data.x, data.y];
        bounds.extend(new kakao.maps.LatLng(Number(dy), Number(dx)));
      }
      map.setBounds(bounds);
      displayPagination(pagination);
      dispatch(placeListActions.addList(datas));
    }
  };

  useEffect(() => {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchPlace, placesSearchCB, {
      x: Number(x),
      y: Number(y),
      radius,
    });

    return () => {
      dispatch(placeListActions.resetList());
    };
  }, [searchPlace]);
};

export default useKeywordSearch;
