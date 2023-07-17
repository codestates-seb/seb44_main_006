import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import FilterTab from './FilterTab';

import { FlexDiv } from '../../styles/styles';
import cssToken from '../../styles/cssToken';
import { communityBasicActions } from '../../store/communitybasic-slice';
import { RootState } from '../../store';

const FilterContainer = styled(FlexDiv)`
  margin: ${cssToken.SPACING['gap-20']};
  column-gap: ${cssToken.SPACING['gap-16']};
  width: ${cssToken.WIDTH['w-full']};
  justify-content: center;

  @media screen and (max-width: 768px) {
    margin: 0px;
  }
`;

const FilterTabDiv = () => {
  const selectTab = useSelector(
    (state: RootState) => state.communityBasic.selectedTab
  );
  const dispatch = useDispatch();
  const setTab = (tab: 'First' | 'Second') => {
    dispatch(communityBasicActions.setTab(tab));
  };
  return (
    <FilterContainer>
      <FilterTab
        content="최신순"
        selectTab={selectTab}
        tab="First"
        onClick={setTab}
      />
      <FilterTab
        content="좋아요순"
        selectTab={selectTab}
        tab="Second"
        onClick={setTab}
      />
    </FilterContainer>
  );
};

export default FilterTabDiv;
