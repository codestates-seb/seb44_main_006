import { styled } from 'styled-components';
import { useState } from 'react';

import cssToken from '../../styles/cssToken';
import ContensCard from '../../components/ui/cards/ContentsCard';
import SearchContainer from '../../components/ui/input/SearchContainer';
import { FlexDiv } from '../../styles/styles';
import Text from '../../components/ui/text/Text';

const CardWrapper = styled.span`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${cssToken.SPACING['gap-50']};
`;
const FilterWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${cssToken.SPACING['gap-50']};
  border-top: 1px solid #dcdcdc;
`;
const Wrapper = styled(FlexDiv)`
  width: 100%;
  flex-direction: column;
  align-items: center;
`;
const FilterContainer = styled(FlexDiv)`
  position: absolute;
  gap: ${cssToken.SPACING['gap-50']};
`;
const FilterDiv = styled.div<{ selected: boolean }>`
  padding-bottom: 0.5rem;
  border-bottom: 0.375rem solid
    ${(props) => (props.selected ? cssToken.COLOR['point-900'] : 'transparent')};
`;

const CommunityPage = () => {
  const [selectTab, setSelectTab] = useState<'Newest' | 'Like'>('Newest');
  const HandleFilter = (tab: 'Newest' | 'Like') => {
    setSelectTab(tab);
  };
  return (
    <Wrapper>
      <SearchContainer
        styles={{
          width: '740px',
          height: '86px',
          fontsize: cssToken.TEXT_SIZE['text-24'],
        }}
      />
      <FilterWrapper>
        <FilterContainer>
          <FilterDiv
            onClick={() => {
              HandleFilter('Newest');
            }}
            selected={selectTab === 'Newest'}
          >
            <Text
              styles={{
                size: cssToken.TEXT_SIZE['text-32'],
                color: selectTab === 'Newest' ? 'black' : '#DCDCDC',
              }}
            >
              최신순
            </Text>
          </FilterDiv>
          <FilterDiv
            onClick={() => {
              HandleFilter('Like');
            }}
            selected={selectTab === 'Like'}
          >
            <Text
              styles={{
                size: cssToken.TEXT_SIZE['text-32'],
                color: selectTab === 'Like' ? 'black' : '#DCDCDC',
              }}
            >
              좋아요순
            </Text>
          </FilterDiv>
        </FilterContainer>
        <CardWrapper>
          <ContensCard />
          <ContensCard />
          <ContensCard />
          <ContensCard />
          <ContensCard />
        </CardWrapper>
      </FilterWrapper>
    </Wrapper>
  );
};

export default CommunityPage;
