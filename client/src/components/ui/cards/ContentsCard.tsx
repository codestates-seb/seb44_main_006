import styled, { css } from 'styled-components';

import cssToken from '../../../styles/cssToken';
import TagButton from '../button/TagButton';
import ThumbnailBox from '../thumbnail/ThumbnailBox';

interface ContCard {
  userName?: string;
  title?: string;
  text?: string;
  heartCount?: string;
  tag?: string[];
}

const ContensCardContainer = styled.section`
  display: flex;
  gap: ${cssToken.SPACING['gap-24']};
  flex-direction: column;
  justify-content: space-between;
  border: 0.0625rem solid ${cssToken.COLOR['gray-500']};
  border-radius: ${cssToken.BORDER['rounded-md']};
  padding: 1.25rem;
  flex-grow: 0;
  width: 25.2813rem;
  transition: ${cssToken.TRANSITION.basic};
  &:hover {
    border: 0.0625rem solid ${cssToken.COLOR['point-900']};
  }
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
  gap: ${cssToken.SPACING['gap-10']};
`;

const TextLimit = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const ContensTitle = styled.h3`
  line-height: 120%;
  font-size: ${cssToken.TEXT_SIZE['text-24']};
  height: 3.4375rem;
  flex: 1;
  ${TextLimit};
`;

const ContensText = styled.p`
  line-height: 120%;
  color: ${cssToken.COLOR['gray-900']};
  font-size: ${cssToken.TEXT_SIZE['text-16']};
  font-weight: ${cssToken.FONT_WEIGHT.light};
  height: 2.1875rem;
  ${TextLimit};
`;

const Tags = styled.div`
  display: flex;
  gap: ${cssToken.SPACING['gap-10']};
`;

const ContensBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DataText = styled.span`
  font-size: ${cssToken.TEXT_SIZE['text-14']};
`;

const ContensCard = ({ title, text, heartCount, tag, userName }: ContCard) => {
  // 버튼 영역은 작업 완료 후 다시 한 번 수정 필요합니다.
  // 컴포넌트 나누는 작업 필요합니다.
  return (
    <ContensCardContainer>
      <ContensTop>
        <UserName>{userName || '탈퇴한 회원'}</UserName>
        <button type="button">더보기 버튼</button>
      </ContensTop>

      <ContensHeader>
        <ContensTitle>{title}</ContensTitle>
        <button type="button">즐찾 위치</button>
      </ContensHeader>

      <ContensText>{text}</ContensText>

      <Tags>
        {tag?.map((tagItem) => (
          <TagButton key={tagItem}>{tagItem}</TagButton>
        ))}
      </Tags>

      <ThumbnailBox
        styles={{
          width: '100%',
          height: '0',
          borderRadius: cssToken.BORDER['rounded-s'],
        }}
        src="https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/big/202310454292163523295.jpg"
      />

      <ContensBottom>
        <div>
          <button type="button">하트버튼</button>
          <DataText>{heartCount}개</DataText>
        </div>
        <DataText>23.06.30</DataText>
      </ContensBottom>
    </ContensCardContainer>
  );
};

export default ContensCard;
