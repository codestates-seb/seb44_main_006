import { useEffect, useState } from 'react';

type PlacesSearchResult = PlacesSearchResultItem[];

interface PlacesSearchResultItem {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code?: `${CategoryCode}` | `${Exclude<CategoryCode, ''>}`[];
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  place_url: string;
  distance: string;
}

enum CategoryCode {
  BLANK = '',
  MT1 = 'MT1',
  CS2 = 'CS2',
  PS3 = 'PS3',
  SC4 = 'SC4',
  AC5 = 'AC5',
  PK6 = 'PK6',
  OL7 = 'OL7',
  SW8 = 'SW8',
  BK9 = 'BK9',
  CT1 = 'CT1',
  AG2 = 'AG2',
  PO3 = 'PO3',
  AT4 = 'AT4',
  AD5 = 'AD5',
  FD6 = 'FD6',
  CE7 = 'CE7',
  HP8 = 'HP8',
  PM9 = 'PM9',
}

interface Pagination {
  nextPage(): void;
  prevPage(): void;
  gotoPage(page: number): void;
  gotoFirst(): void;
  gotoLast(): void;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  current: number;
  first: number;
  last: number;
}

const PlaceList = ({ searchPlace }: { searchPlace: string }) => {
  // 검색결과 배열에 담아줌
  const [places, setPlaces] = useState<PlacesSearchResult>([]);

  const ps = new kakao.maps.services.Places();

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
      displayPagination(pagination);
      setPlaces(datas);
    }
  }

  useEffect(() => {
    ps.keywordSearch(searchPlace, placesSearchCB);
  }, [searchPlace]);

  return (
    <div id="result-list">
      {places.map((item: PlacesSearchResultItem, i) => (
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
