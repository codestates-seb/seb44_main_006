import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';

import ContensCard from '../ui/cards/ContentsCard';
import cssToken from '../../styles/cssToken';
import { CardWrapper, FlexDiv } from '../../styles/styles';
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
  top: -2.9375rem;
  column-gap: ${cssToken.SPACING['gap-50']};
`;

const FilterSection = ({ children }: { children: Props['children'] }) => {
  const [ref, inView] = useInView();
  return (
    <FilterWrapper>
      <FilterContainer>{children}</FilterContainer>
      {/* Todo 리액트쿼리 데이터로 변경하기 */}
      <CardWrapper>
        <ContensCard />
        <ContensCard />
        <ContensCard />
        <ContensCard />
        <ContensCard />
      </CardWrapper>
      <div ref={ref} />
    </FilterWrapper>
  );
};

export default FilterSection;
