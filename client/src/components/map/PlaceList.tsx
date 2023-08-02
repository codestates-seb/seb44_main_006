import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import useKeywordSearch from '../../hooks/useKeywordSearch';
import { Pagination, PlacesSearchResultItem } from '../../types/type';
import { RootState } from '../../store';
import { LocationCard } from '../ui/cards/index';
import cssToken from '../../styles/cssToken';
import useGeolocation from '../../hooks/useGeolocation';
import Noresult from '../ui/Noresult';
import { markerActions } from '../../store/marker-slice';
import { scheduleListActions } from '../../store/scheduleList-slice';
import showToast from '../../utils/showToast';
import defaultOptions from '../../utils/constant/constant';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssToken.SPACING['gap-16']};
`;

const PaginationWrapper = styled.section`
  width: 100%;

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${cssToken.SPACING['gap-12']};
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: ${cssToken.BORDER['rounded-full']};
    color: ${cssToken.COLOR.white};
    background-color: ${cssToken.COLOR['gray-500']};
    text-decoration: none;

    &.on {
      background-color: ${cssToken.COLOR['point-900']};
    }

    &:hover {
      box-shadow: ${cssToken.SHADOW['shadow-4xl']};
    }
  }
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
  const scheduleList = useSelector(
    (state: RootState) => state.scheduleList.list
  );

  const paginationRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const curLocation = useGeolocation();
  const x = curLocation.coords
    ? `${curLocation.coords?.longitude}`
    : `${defaultOptions.lng}`;
  const y = curLocation.coords
    ? `${curLocation.coords?.latitude}`
    : `${defaultOptions.lat}`;

  const displayPagination = useCallback((pagination: Pagination) => {
    const div = document.createElement('div');

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

      div.appendChild(el);
    }
    paginationRef.current?.appendChild(div);
  }, []);

  useKeywordSearch(
    displayPagination,
    searchPlace,
    schedule.x || x,
    schedule.y || y,
    radius ? radius * 1000 : undefined
  );

  const handleClick = (item: PlacesSearchResultItem, id: string) => {
    const placeId = uuidv4();
    if (scheduleList.length < 10) {
      dispatch(
        scheduleListActions.addList({
          placeName: item.place_name,
          placeUrl: item.place_url,
          roadAddressName: item.road_address_name,
          id: placeId,
          phone: item.phone,
          categoryGroupCode: item.category_group_code,
          categoryGroupName: item.category_group_name,
          x: item.x,
          y: item.y,
        })
      );
      dispatch(
        markerActions.selectMarker({
          markerId: id,
          center: { lat: item.y, lng: item.x },
        })
      );
    } else {
      showToast('error', '일정은 10개까지 등록 가능합니다!')();
    }
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
            place_url={item.place_url}
            onClick={() => handleClick(item, item.id)}
            x={item.x}
            y={item.y}
          />
        );
      })}
      <PaginationWrapper ref={paginationRef} />
    </Wrapper>
  );
};

export default PlaceList;
