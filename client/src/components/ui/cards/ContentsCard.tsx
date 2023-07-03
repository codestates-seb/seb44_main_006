import styled from 'styled-components';

import cssToken from '../../../styles/cssToken';

const ContensCardContainer = styled.section`
  display: flex;
  gap: ${cssToken.SPACING['gap-24']};
  flex-direction: column;
  border: 0.0625rem solid ${cssToken.COLOR['gray-500']};
  border-radius: ${cssToken.BORDER['rounded-md']};
  padding: 1.25rem;
`;

const UserName = styled.span`
  font-size: ${cssToken.TEXT_SIZE['text-16']};
  font-weight: ${cssToken.FONT_WEIGHT.medium};
`;

const ContensTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContensHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContensTitle = styled.h3`
  font-size: ${cssToken.TEXT_SIZE['text-24']};
`;

const ContensText = styled.p`
  color: ${cssToken.COLOR['gray-500']};
  font-size: ${cssToken.TEXT_SIZE['text-16']};
`;

const Tags = styled.div`
  display: flex;
  gap: ${cssToken.SPACING['gap-10']};
`;

const Thumbnail = styled.div`
  position: relative;
  border-radius: ${cssToken.BORDER['rounded-s']};
  overflow: hidden;
  width: ${cssToken.WIDTH['w-full']};
  height: 0;
  padding-bottom: 50%;
`;

export const Img = styled.img`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  object-fit: cover;
  width: ${cssToken.WIDTH['w-full']};
  height: ${cssToken.HEIGHT['h-full']};
`;

const ContensButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DataText = styled.span`
  font-size: ${cssToken.TEXT_SIZE['text-14']};
`;

const ContensCard = () => {
  return (
    <ContensCardContainer>
      <ContensTop>
        <UserName>하루하루</UserName>
        <button>더보기 버튼</button>
      </ContensTop>

      <ContensHeader>
        <ContensTitle>
          오늘티켓팅성공하게해주세요 제발요8시제발...{' '}
        </ContensTitle>
        <button>즐찾 위치</button>
      </ContensHeader>

      <ContensText>
        길막마전부타비켜엘사불러도날못식혀쇳뿔 달고뛰어일
        직선쉽게타지마삐딱선...
      </ContensText>

      <div>
        <Tags>
          <span>성심당</span>
          <span>성심당</span>
          <span>성심당</span>
        </Tags>

        <Thumbnail>
          <Img src="https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/big/202310454292163523295.jpg" />
        </Thumbnail>
      </div>

      <ContensButton>
        <div>
          <button>하트버튼</button>
          <DataText>000개</DataText>
        </div>
        <DataText>23.06.30</DataText>
      </ContensButton>
    </ContensCardContainer>
  );
};

export default ContensCard;
