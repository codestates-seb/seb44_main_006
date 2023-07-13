import { styled } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import SearchContainer from '../ui/input/SearchContainer';
import PlaceList from '../map/PlaceList';
import { selectedIdActions } from '../../store/selectedId-slice';

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DirectSearch = () => {
  const [searchPlace, setSearchPlace] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectedIdActions.setCategoryId(''));
    dispatch(selectedIdActions.setTagId(''));
  }, [dispatch]);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (inputRef.current) {
      setSearchPlace(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <SearchContainer searchClick={handleSubmit} ref={inputRef} />
      </FormContainer>
      <PlaceList searchPlace={searchPlace} />
    </>
  );
};

export default DirectSearch;
