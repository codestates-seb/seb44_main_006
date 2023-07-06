import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import KakaoMap from '../../components/map/KakaoMap';
import Marker from '../../components/map/Marker';
import PlaceList from '../../components/map/PlaceList';
import { IScheduleListItem, PlacesSearchResultItem } from '../../types/type';
import { RootState } from '../../store';
import ScheduleBox from '../../components/schedule/Schedulebox';
import cssToken from '../../styles/cssToken';
import { MarkerOff } from '../../components/map/index';
import SearchContainer from '../../components/ui/input/SearchContainer';

const Wrapper = styled.div`
  width: ${cssToken.WIDTH['w-screen']};
  height: ${cssToken.HEIGHT['h-screen']};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScheduleRegister = () => {
  const [searchPlace, setSearchPlace] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useSelector((state: RootState) => state.placeList.list);
  const scheduleList = useSelector(
    (state: RootState) => state.scheduleList.list
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      setSearchPlace(inputRef.current.value);
      inputRef.current.value = '';
    }
  };
  // FIXME 숫자 마커가 일반 마커에 가려지는 현상 수정해야함
  return (
    <Wrapper>
      <ScheduleBox>
        <FormContainer onSubmit={handleSubmit}>
          <SearchContainer ref={inputRef} />
        </FormContainer>
        <PlaceList searchPlace={searchPlace} />
      </ScheduleBox>
      <KakaoMap width="100vw" height="100vh">
        {places.map((place: PlacesSearchResultItem) => (
          <Marker
            img={MarkerOff[0]}
            key={place.id}
            lat={Number(place.y)}
            lng={Number(place.x)}
            id={Number(place.id)}
          />
        ))}
        {scheduleList.map((place: IScheduleListItem, idx: number) => (
          <Marker
            key={place.id}
            lat={Number(place.y)}
            lng={Number(place.x)}
            id={Number(place.id)}
            idx={idx}
          />
        ))}
      </KakaoMap>
    </Wrapper>
  );
};

export default ScheduleRegister;
