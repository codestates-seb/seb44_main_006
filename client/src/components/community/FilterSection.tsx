import { styled } from 'styled-components';
import { useState } from 'react';

import FilterTab from './FilterTab';

import ContensCard from '../ui/cards/ContentsCard';
import cssToken from '../../styles/cssToken';
import { FlexDiv } from '../../styles/styles';
import { Props } from '../../types/type';

const FilterWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${cssToken.SPACING['gap-50']};
  border-top: 1px solid #dcdcdc;
`;
const FilterContainer = styled(FlexDiv)`
  position: absolute;
  top: -47px;
  column-gap: ${cssToken.SPACING['gap-50']};
`;

const CardWrapper = styled.div`
  width: 90%;
  place-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(405px, 405px));
  grid-auto-flow: row;
  gap: ${cssToken.SPACING['gap-50']};
`;

const FilterSection = ({ children }: { children: Props['children'] }) => {
  return (
    <FilterWrapper>
      <FilterContainer>{children}</FilterContainer>
      <CardWrapper>
        <ContensCard />
        <ContensCard />
        <ContensCard />
        <ContensCard />
        <ContensCard />
      </CardWrapper>
    </FilterWrapper>
  );
};

export default FilterSection;
