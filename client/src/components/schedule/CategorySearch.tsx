import { styled } from 'styled-components';
import { useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';

import CategoryContainer from './CategoryContainer';
import RadiusTagContainer from './RadiusTagContainer';

import Text from '../ui/text/Text';
import cssToken from '../../styles/cssToken';
import Button from '../ui/button/Button';
import PlaceList from '../map/PlaceList';
import { ICSearchState } from '../../types/type';
import { selectedIdActions } from '../../store/selectedId-slice';
import SkyBlueButton from '../ui/button/SkyBlueButton';

const ButtonWrapper = styled.section`
  width: ${cssToken.WIDTH['w-full']};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${cssToken.SPACING['gap-10']};
`;

const reducer = (
  state: ICSearchState,
  { type, payload }: { type: string; payload: ICSearchState }
): ICSearchState => {
  switch (type) {
    case 'RADIUS':
      return { ...state, radius: payload.radius };
    case 'CATEGORY':
      return { ...state, category: payload.category };
    default:
      return state;
  }
};

const CategorySearch = () => {
  const [searchPlace, setSearchPlace] = useState<ICSearchState>({
    radius: undefined,
    category: '',
  });
  const [choice, dispatch] = useReducer(reducer, {
    radius: 1,
    category: '',
  });

  const reduxDispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClick = () => {
    if (choice.radius && choice.category) {
      setSearchPlace({ radius: choice.radius, category: choice.category });
    }
  };

  const resetChoice = () => {
    dispatch({ type: 'RADIUS', payload: { radius: 1 } });
    dispatch({ type: 'CATEGORY', payload: { category: '' } });
    setSearchPlace({ radius: 1, category: '' });
    reduxDispatch(selectedIdActions.setTagId('1'));
    reduxDispatch(selectedIdActions.setCategoryId(''));
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <Text styles={{ weight: 500 }}>반경 선택</Text>
        <RadiusTagContainer dispatch={dispatch} />
        <Text styles={{ weight: 500 }}>카테고리 선택</Text>
        <CategoryContainer dispatch={dispatch} />
        <ButtonWrapper>
          <Button
            styles={{ color: `${cssToken.COLOR['gray-900']}` }}
            onClick={resetChoice}
          >
            초기화
          </Button>
          <SkyBlueButton
            width="76px"
            height="35px"
            brradius={cssToken.BORDER['rounded-s']}
            onClick={handleClick}
          >
            적용
          </SkyBlueButton>
        </ButtonWrapper>
      </FormContainer>
      <PlaceList
        searchPlace={searchPlace.category}
        radius={searchPlace.radius}
      />
    </>
  );
};

export default CategorySearch;
