import { styled } from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

import cssToken from '../../styles/cssToken';
import SearchContainer from '../../components/ui/input/SearchContainer';
import { FlexDiv } from '../../styles/styles';
import FilterSection from '../../components/community/FilterSection';
import FilterTab from '../../components/community/FilterTab';
import useHandleTab from '../../hooks/useHandleTab';
import CircleButton from '../../components/ui/button/CircleButton';
import Pen from '../../assets/Pen';
import useMovePage from '../../hooks/useMovePage';
import getLoginStatus from '../../utils/getLoginStatus';
import useInfiniteScrollQuery from '../../hooks/useInfiniteQuery';
import { LIMIT } from '../../utils/constant/constant';
import { communityBasicActions } from '../../store/communitybasic-slice';

const Wrapper = styled(FlexDiv)`
  margin-top: 3.125rem;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 6.5rem;
  row-gap: 7.75rem;
`;

const Div = styled.div`
  margin-bottom: 0.25rem;
`;

const FixedDiv = styled.div`
  position: fixed;
  right: ${cssToken.SPACING['gap-40']};
  bottom: ${cssToken.SPACING['gap-40']};
`;

const CommunityPage = () => {
  const goToSelect = useMovePage('/community/select');
  // const goToError = useMovePage('/error/500');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isLogin = getLoginStatus();
  const { selectTab, setTab } = useHandleTab();
  const [tagName, setTagName] = useState<string>('');
  const dispatch = useDispatch();

  const { data, fetchNextPage, hasNextPage, error } = useInfiniteScrollQuery({
    limit: LIMIT,
    tagName: tagName || '',
    sort: selectTab,
  });

  useEffect(() => {
    if (data) {
      dispatch(communityBasicActions.setData(data?.pages));
    }
  }, [data, dispatch]);

  const SearchPost = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (searchInputRef.current) {
      const keyword = searchInputRef.current?.value;
      setTagName(keyword);
    }
  };

  if (error) {
    console.error(error);
    // goToError();
  }

  return (
    <>
      <Wrapper>
        <form onSubmit={SearchPost}>
          <SearchContainer
            searchClick={SearchPost}
            ref={searchInputRef}
            iconWidth={24}
            iconHeight={24}
            styles={{
              width: '500px',
              height: '50px',
              fontsize: cssToken.TEXT_SIZE['text-18'],
            }}
          />
        </form>
        <FilterSection hasNextPage={hasNextPage} fetchNextPage={fetchNextPage}>
          <FilterTab
            content="최신순"
            selectTab={selectTab}
            tab="Newest"
            onClick={setTab}
          />
          <FilterTab
            content="좋아요순"
            selectTab={selectTab}
            tab="Like"
            onClick={setTab}
          />
        </FilterSection>
      </Wrapper>
      {isLogin && (
        <FixedDiv onClick={goToSelect}>
          <CircleButton width="117px" height="117px">
            <Div>
              <Pen style={{ iconWidth: 28, iconHeight: 28, color: 'black' }} />
            </Div>
            <div>자랑하기</div>
          </CircleButton>
        </FixedDiv>
      )}
    </>
  );
};

export default CommunityPage;
