import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Pagination, PlacesSearchResult } from '../types/type';
import { placeListActions } from '../store/placeList-slice';
import { RootState } from '../store';

const useKeywordSearch = (
  displayPagination: (pagination: Pagination) => void,
  searchPlace: string | undefined,
  x?: string,
  y?: string,
  radius?: number
) => {
  const map = useSelector((state: RootState) => state.map.map);

  const dispatch = useDispatch();

  const placesSearchCB = useCallback(
    (datas: PlacesSearchResult, status: string, pagination: Pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < datas.length; i += 1) {
          const data = datas[i];
          const [dx, dy] = [data.x, data.y];
          bounds.extend(new kakao.maps.LatLng(Number(dy), Number(dx)));
        }

        map.setBounds(bounds);
      }

      if (datas.length) {
        displayPagination(pagination);
        dispatch(placeListActions.setIsEmpty(false));
        dispatch(placeListActions.addList(datas));
      }
      // TODO 여기에 검색한 결과가 없다는 컴포넌트 보여줄 상태 필요할 듯
      else dispatch(placeListActions.setIsEmpty(true));
    },
    [dispatch, displayPagination, map]
  );

  useEffect(() => {
    const ps = new kakao.maps.services.Places();

    if (searchPlace)
      ps.keywordSearch(searchPlace, placesSearchCB, {
        x: Number(x),
        y: Number(y),
        radius,
      });
  }, [searchPlace, dispatch, x, y, radius, placesSearchCB]);
};

export default useKeywordSearch;
