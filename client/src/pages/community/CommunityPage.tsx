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
  const [tagName, setTagName] = useState<string>('');
  const { selectTab, setTab } = useHandleTab();
  const goToSelect = useMovePage('/community/select');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { data: communityData } = useQuery({
    queryKey: ['community', selectTab],
    queryFn: () =>
      GetCommunityList({
        page: 1,
        limit: 6,
        sort: selectTab,
        tagName,
      }),
    refetchOnWindowFocus: false,
  });

  console.log('data', communityData);

  const SearchPost = () => {
    if (searchInputRef.current) {
      const keyword = searchInputRef.current?.value;
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
        <FilterSection>
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
      {/* TODO 로그인 상태에 따라 표시 여부 다르게 */}
      <FixedDiv onClick={goToSelect}>
        <CircleButton width="117px" height="117px">
          <Div>
            <Pen style={{ iconWidth: 28, iconHeight: 28, color: 'black' }} />
          </Div>
          <div>자랑하기</div>
        </CircleButton>
      </FixedDiv>
    </>
  );
};

export default CommunityPage;
