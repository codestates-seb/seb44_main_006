import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import KakaoMap from './KakaoMap';
import Marker from './Marker';
import PlaceList from './PlaceList';

import { PlacesSearchResultItem } from '../../types/type';
import { RootState } from '../../store';

import { MarkerOff } from '.';

const SearchPlace = () => {
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
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input placeholder="검색어를 입력하세요" ref={inputRef} />
        <button type="submit">검색</button>
      </form>
      <KakaoMap width="100vw" height="50vh">
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
      <PlaceList searchPlace={searchPlace} />
    </>
  );
};

export default SearchPlace;
