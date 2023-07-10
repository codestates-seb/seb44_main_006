import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import cssToken from '../../styles/cssToken';
import SearchContainer from '../../components/ui/input/SearchContainer';
import { FlexDiv } from '../../styles/styles';
import FilterSection from '../../components/community/FilterSection';
import FilterTab from '../../components/community/FilterTab';
import useHandleTab from '../../hooks/useHandleTab';
import CircleButton from '../../components/ui/button/CircleButton';
import Pen from '../../assets/Pen';
import useMovePage from '../../hooks/useMovePage';
import { GetCommunityList } from '../../apis/api';
import getLoginStatus from '../../utils/getLoginStatus';
import useInfiniteScrollQuery from '../../hooks/useInfiniteQuery';

const Wrapper = styled(FlexDiv)`
  margin-top: 77px;
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
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isLogin = getLoginStatus();
  const { selectTab, setTab } = useHandleTab();
  const [tagName, setTagName] = useState<string>('');

  const { data, fetchNextPage, isSuccess, hasNextPage } =
    useInfiniteScrollQuery({
      limit: 3,
      tagName: tagName || '',
      sort: selectTab,
    });

  const SearchPost = () => {
    if (searchInputRef.current) {
      const keyword = searchInputRef.current?.value;
      setTab('Newest');
      setTagName(keyword);
    }
  };

  return (
    <>
      <Wrapper>
        <SearchContainer
          ref={searchInputRef}
          iconWidth={39}
          iconHeight={39}
          styles={{
            width: '740px',
            height: '86px',
            fontsize: cssToken.TEXT_SIZE['text-24'],
          }}
          callback={SearchPost}
        />
        {isSuccess && (
          <FilterSection
            communityData={data?.pages}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          >
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
        )}
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
