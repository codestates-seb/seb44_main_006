import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import KakaoMap from '../../components/map/KakaoMap';
import Marker from '../../components/map/Marker';
import PlaceList from '../../components/map/PlaceList';
import { PlacesSearchResultItem } from '../../types/type';
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

const ScheduleRegister = () => {
  const [searchPlace, setSearchPlace] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useSelector((state: RootState) => state.placeList.list);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      setSearchPlace(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  return (
    <Wrapper>
      <ScheduleBox>
        <form className="inputForm" onSubmit={handleSubmit}>
          <input placeholder="검색어를 입력하세요" ref={inputRef} />
          <button type="submit">검색</button>
          <SearchContainer />
        </form>
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
      </KakaoMap>
    </Wrapper>
  );
};

export default ScheduleRegister;
