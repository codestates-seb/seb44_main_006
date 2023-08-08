import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import cssToken from '../../styles/cssToken';
import { ICSearchState } from '../../types/type';
import { RootState } from '../../store';
import { selectedIdActions } from '../../store/selectedId-slice';
import TagButton from '../ui/button/TagButton';

const Wrapper = styled.section`
  width: ${cssToken.WIDTH['min-w-fit']};
  display: flex;
  gap: ${cssToken.SPACING['gap-10']};

  > button {
    font-size: 0.82rem;
    padding: 0.3125rem 0.4375rem 0.1875rem;
  }
`;

interface IAction {
  type: string;
  payload: ICSearchState;
}

interface Props {
  dispatch: React.Dispatch<IAction>;
}

const RadiusTagContainer = ({ dispatch }: Props) => {
  const arr = ['1km', '3km', '5km', '10km'];
  const selectedId = useSelector((state: RootState) => state.selectedId.tagId);

  const reduxDispatch = useDispatch();

  const handleClick = (tagname: string | undefined) => {
    dispatch({ type: 'RADIUS', payload: { radius: Number(tagname) } });
    if (tagname) reduxDispatch(selectedIdActions.setTagId(tagname));
  };

  return (
    <Wrapper>
      {arr.map((value) => (
        <TagButton
          key={value}
          selectedid={selectedId}
          tagname={value.split('km')[0]}
          onClick={handleClick}
        >
          {value}
        </TagButton>
      ))}
    </Wrapper>
  );
};

export default RadiusTagContainer;
