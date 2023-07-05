import { styled } from 'styled-components';

import cssToken from '../../styles/cssToken';
import { CardWrapper, FlexDiv } from '../../styles/styles';
import ContensCard from '../../components/ui/cards/ContentsCard';
import Head from '../../components/community/Head';
import Btn from '../../components/community/PageMoveButton';

const OutsideWrap = styled(FlexDiv)`
  margin-top: 77px;
  /* height: 100vh; */
  padding-top: ${cssToken.SPACING['px-50']};
  padding-left: ${cssToken.SPACING['py-100']};
  padding-right: ${cssToken.SPACING['py-100']};
  flex-direction: column;
  /* justify-content: space-between; */
  row-gap: ${cssToken.SPACING['gap-50']};
`;

const OverFlowDiv = styled.div`
  height: 62vh;
  overflow-y: scroll;
`;

const SelectSchedulePage = () => {
  return (
    <OutsideWrap>
      <Head />
      <OverFlowDiv>
        <CardWrapper>
          {/* Todo 리액트쿼리로 유저 일정 가지고 와서 뿌려줘야함 */}
          {/* Todo 카드 onClick callback 걸어야함 */}
          <ContensCard />
          <ContensCard />
          <ContensCard />
          <ContensCard />
          <ContensCard />
          <ContensCard />
          <ContensCard />
          <ContensCard />
          <ContensCard />
        </CardWrapper>
      </OverFlowDiv>
      <Btn backUrl="/community" nextUrl="/community/post" />
    </OutsideWrap>
  );
};

export default SelectSchedulePage;
