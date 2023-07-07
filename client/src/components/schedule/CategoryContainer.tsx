import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import cssToken from '../../styles/cssToken';
import CategoryButton from '../ui/button/CategoryButton';
import { ICSearchState } from '../../types/type';
import { RootState } from '../../store';
import { selectedIdActions } from '../../store/selectedId-slice';

const Wrapper = styled.section`
  width: ${cssToken.WIDTH['w-full']};
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
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
    '버스정류장',
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
          width="7rem"
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
