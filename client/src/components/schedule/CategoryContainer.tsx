import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { ICSearchState } from '../../types/type';
import { RootState } from '../../store';
import { selectedIdActions } from '../../store/selectedId-slice';
import CategoryButton from '../ui/button/CategoryButton';

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  > button {
    font-size: 0.82rem;
  }
`;

interface IAction {
  type: string;
  payload: ICSearchState;
}

interface Props {
  dispatch: React.Dispatch<IAction>;
}

const CategoryContainer = ({ dispatch }: Props) => {
  const arr = [
    '맛집',
    '카페',
    '문화시설',
    '지하철',
    '공원',
    '백화점',
    '영화관',
    '경기장',
    '버스터미널',
  ];
  const selectedId = useSelector(
    (state: RootState) => state.selectedId.categoryId
  );
  const reduxDispatch = useDispatch();

  const handleClick = (category: string | undefined) => {
    dispatch({ type: 'CATEGORY', payload: { category } });
    if (category) reduxDispatch(selectedIdActions.setCategoryId(category));
  };

  return (
    <Wrapper>
      {arr.map((name) => (
        <CategoryButton
          key={name}
          width="100%"
          height="2rem"
          selectedid={selectedId}
          categoryname={name}
          onClick={handleClick}
        >
          {name}
        </CategoryButton>
      ))}
    </Wrapper>
  );
};

export default CategoryContainer;
