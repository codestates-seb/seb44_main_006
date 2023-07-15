import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';

import useKeywordSearch from '../../hooks/useKeywordSearch';
import { Pagination, PlacesSearchResultItem } from '../../types/type';
import { RootState } from '../../store';
import LocationCard from '../ui/cards/LocationCard';
import cssToken from '../../styles/cssToken';
import { showDetailActions } from '../../store/showDetail-slice';
import useGeolocation from '../../hooks/useGeolocation';
import Noresult from '../ui/Noresult';
import { markerActions } from '../../store/marker-slice';

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

const PlaceList = ({
  searchPlace,
  radius,
}: {
  searchPlace: string | undefined;
  radius?: number;
}) => {
  const places = useSelector((state: RootState) => state.placeList.list);
  const isEmpty = useSelector((state: RootState) => state.placeList.isEmpty);
  const schedule = useSelector(
    (state: RootState) => state.scheduleList.lastItem
  );

  const paginationRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const curLocation = useGeolocation();
  const x = curLocation.coords
    ? `${curLocation.coords?.longitude}`
    : '126.570667';
  const y = curLocation.coords
    ? `${curLocation.coords?.latitude}`
    : '33.450701';

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
    schedule.x || x,
    schedule.y || y,
    radius ? radius * 1000 : undefined
  );

  const handleClick = (item: PlacesSearchResultItem, id: string) => {
    dispatch(showDetailActions.setIsShow(true));
    dispatch(showDetailActions.setItem(item));
    dispatch(
      markerActions.selectMarker({
        markerId: id,
        center: { lat: item.y, lng: item.x },
      })
    );
  };

  return isEmpty ? (
    <Noresult iconHeight={50} iconWidth={50} size="1rem" />
  ) : (
    <Wrapper>
      {places.map((item: PlacesSearchResultItem) => {
        return (
          <LocationCard
            key={item.id}
            id={item.id}
            title={item.place_name}
            category={
              item.category_name ? item.category_name.split('>')[0] : ''
            }
            address={item.road_address_name}
            phone={item.phone}
            onClick={() => handleClick(item, item.id)}
          />
        );
      })}
      <PaginationWrapper ref={paginationRef} />
    </Wrapper>
  );
};

export default PlaceList;
