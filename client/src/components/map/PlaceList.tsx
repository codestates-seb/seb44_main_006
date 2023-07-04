import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Pagination,
  PlacesSearchResult,
  PlacesSearchResultItem,
} from '../../types/type';
import { placeListActions } from '../../store/placeList-slice';

const PlaceList = ({ searchPlace }: { searchPlace: string }) => {
  const map = useSelector((state: any) => state.map.map);
  const places = useSelector((state: any) => state.placeList.list);
  const ps = new kakao.maps.services.Places();
  const dispatch = useDispatch();
  console.log(places);

  // 검색결과 목록 하단에 페이지 번호 표시
  function displayPagination(pagination: Pagination) {
    const paginationEl = document.getElementById('pagination')!;
    const fragment = document.createDocumentFragment();

    // 기존에 추가된 페이지 번호 삭제
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (let i = 1; i <= pagination.last; i += 1) {
      const el = document.createElement('a');
      el.href = '#';
      el.innerHTML = `${i}`;

      if (i === pagination.current) {
        el.className = 'on';
      } else {
        el.onclick = ((idx) => {
          return () => {
            pagination.gotoPage(idx);
          };
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  }

  function placesSearchCB(
    datas: PlacesSearchResult,
    status: string,
    pagination: Pagination
  ) {
    if (status === kakao.maps.services.Status.OK) {
      const bounds = new kakao.maps.LatLngBounds();
      for (let i = 0; i < datas.length; i += 1) {
        const data = datas[i];
        const [dx, dy] = [data.x, data.y];
        bounds.extend(new kakao.maps.LatLng(Number(dy), Number(dx)));
      }
      map.setBounds(bounds);
      displayPagination(pagination);
      // setPlaces(datas);
      dispatch(placeListActions.addList(datas));
    }
  }

  useEffect(() => {
    ps.keywordSearch(searchPlace, placesSearchCB);

    return () => {
      dispatch(placeListActions.resetList());
    };
  }, [searchPlace]);

  return (
    <div id="result-list">
      {places.map((item: PlacesSearchResultItem, i: number) => (
        <div key={item.id} style={{ marginTop: '20px' }}>
          <span>{i + 1}</span>
          <div>
            <h5>{item.place_name}</h5>
            {item.road_address_name ? (
              <div>
                <span>{item.road_address_name}</span>
                <span>{item.address_name}</span>
              </div>
            ) : (
              <span>{item.address_name}</span>
            )}
            <span>{item.phone}</span>
          </div>
        </div>
      ))}
      <div id="pagination" />
    </div>
  );
};

export default PlaceList;
