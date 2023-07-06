import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';

import useKeywordSearch from '../../hooks/useKeywordSearch';
import { Pagination, PlacesSearchResultItem } from '../../types/type';
import { RootState } from '../../store';
import LocationCard from '../ui/cards/LocationCard';
import cssToken from '../../styles/cssToken';
import { scheduleListActions } from '../../store/scheduleList-slice';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssToken.SPACING['gap-16']};
`;

const PaginationWrapper = styled.section`
  width: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const PlaceList = ({ searchPlace }: { searchPlace: string }) => {
  const places = useSelector((state: RootState) => state.placeList.list);
  const schedule = useSelector(
    (state: RootState) => state.scheduleList.lastItem
  );
  const paginationRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const displayPagination = useCallback((pagination: Pagination) => {
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
  }, []);

  useKeywordSearch(
    displayPagination,
    searchPlace,
    schedule.x,
    schedule.y,
    5000
  );
  // 이렇게 하면 마지막으로 등록한 일정 기준으로 검색할 수 있음

  return (
    <Wrapper>
      {places.map((item: PlacesSearchResultItem) => (
        <LocationCard
          title={item.place_name}
          category={item.category_name.split('>')[0]}
          address={item.road_address_name}
          phone={item.phone}
          onClick={() =>
            dispatch(
              scheduleListActions.addList({
                placeName: item.place_name,
                placeUrl: item.place_url,
                roadAddressName: item.road_address_name,
                id: item.id,
                phone: item.phone,
                categoryGroupCode: item.category_group_code,
                categoryGroupName: item.category_group_name,
                x: item.x,
                y: item.y,
              })
            )
          }
        />
      ))}
      <PaginationWrapper ref={paginationRef} />
    </Wrapper>
  );
};

export default PlaceList;
