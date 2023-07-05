import { useRef } from 'react';
import { useSelector } from 'react-redux';

import useKeywordSearch from './useKeywordSearch';

import { Pagination, PlacesSearchResultItem } from '../../types/type';
import { RootState } from '../../store';

const PlaceList = ({ searchPlace }: { searchPlace: string }) => {
  const places = useSelector((state: RootState) => state.placeList.list);
  const paginationRef = useRef<HTMLDivElement>(null);

  // 검색결과 목록 하단에 페이지 번호 표시
  const displayPagination = (pagination: Pagination) => {
    const fragment = document.createDocumentFragment();

    while (paginationRef.current?.firstChild) {
      paginationRef.current.removeChild(paginationRef.current.firstChild);
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
    paginationRef.current?.appendChild(fragment);
  };

  useKeywordSearch(displayPagination, searchPlace);

  return (
    <div>
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
      <div ref={paginationRef} />
    </div>
  );
};

export default PlaceList;
