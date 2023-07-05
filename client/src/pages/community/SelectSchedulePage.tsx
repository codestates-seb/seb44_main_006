import { styled } from 'styled-components';

import Title from '../../components/ui/text/Title';
import cssToken from '../../styles/cssToken';
import Text from '../../components/ui/text/Text';
import { CardWrapper, FlexDiv } from '../../styles/styles';
import ContensCard from '../../components/ui/cards/ContentsCard';
import GrayButton from '../../components/ui/button/GrayButton';
import SkyBlueButton from '../../components/ui/button/SkyBlueButton';
import useMovePage from '../../hooks/useMovePage';

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

const HeadDiv = styled(FlexDiv)`
  flex-direction: column;
  row-gap: 3px;
`;

const OverFlowDiv = styled.div`
  height: 62vh;
  overflow-y: scroll;
`;

const BtnDiv = styled(FlexDiv)`
  width: 100%;
  justify-content: center;
  column-gap: ${cssToken.SPACING['gap-12']};
  margin-bottom: ${cssToken.SPACING['gap-50']};
`;

const SelectSchedulePage = () => {
  const goToCommunity = useMovePage('/community');
  const goToPostCommunity = useMovePage('/community/post');
  return (
    <OutsideWrap>
      <HeadDiv>
        <Title styles={{ size: cssToken.TEXT_SIZE['text-40'] }}>
          나의 코스 자랑하기
        </Title>
        <Text
          styles={{
            size: cssToken.TEXT_SIZE['text-18'],
            color: cssToken.COLOR['gray-900'],
          }}
        >
          자랑할 일정을 선택해주세요.
        </Text>
      </HeadDiv>
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
      <BtnDiv>
        <GrayButton
          width="222px"
          height="53px"
          borderRadius={cssToken.BORDER['rounded-md']}
          onClick={goToCommunity}
        >
          뒤로가기
        </GrayButton>
        <SkyBlueButton
          width="222px"
          height="53px"
          borderRadius={cssToken.BORDER['rounded-md']}
          onClick={goToPostCommunity}
        >
          작성하기
        </SkyBlueButton>
      </BtnDiv>
    </OutsideWrap>
  );
};

export default SelectSchedulePage;
