import styled, { css } from 'styled-components';

import { CardCommonBox } from './Card.styled';

import cssToken from '../../../styles/cssToken';
import TagButton from '../button/TagButton';
import ThumbnailBox from '../thumbnail/ThumbnailBox';
import OptionButton from '../button/OptionButton';
import StarButton from '../button/StarButton';
import LikeButton from '../button/LikeButton';
import { ContCardInfo } from '../../../types/type';

const ContensCardContainer = styled.section<{ selected?: boolean }>`
  display: flex;
  gap: ${cssToken.SPACING['gap-24']};
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;
  flex-grow: 0;
  width: 25.2813rem;
  ${CardCommonBox}
  border: ${(props) =>
    props.selected
      ? `0.125rem solid ${cssToken.COLOR['point-900']}`
      : `0.0625rem solid ${cssToken.COLOR['gray-500']};`}
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

const LikeBtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DataText = styled.span`
  font-size: ${cssToken.TEXT_SIZE['text-14']};
`;

const ContensCard = ({
  title,
  text,
  likeCount,
  tag,
  userName,
  onClick,
  selectId,
  id,
}: ContCardInfo) => {
  // Todo 컴포넌트 나누는 작업 필요 합니다. id는 나중에 넘겨줄것임.
  const selected = selectId !== undefined && selectId === id;
  return (
    <ContensCardContainer
      onClick={() => {
        if (onClick && id) onClick(id);
      }}
      selected={selected}
    >
      <ContensTop>
        <UserName>{userName || '탈퇴한 회원'}</UserName>
        <OptionButton isActive={false} />
      </ContensTop>

      <ContensHeader>
        <ContensTitle>{title}</ContensTitle>
        <StarButton width="60px" height="60px" isActive />
      </ContensHeader>

      <ContensText>{text}</ContensText>

      <Tags>
        {tag?.map((tagItem: string) => (
          <TagButton
            width={cssToken.WIDTH['min-w-fit']}
            height={cssToken.HEIGHT['h-fit']}
            isActive={false}
            key={tagItem}
          >
            {tagItem}
          </TagButton>
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
        <LikeBtnBox>
          <LikeButton isActive />
          <DataText>{likeCount}개</DataText>
        </LikeBtnBox>
        <DataText>23.06.30</DataText>
      </ContensBottom>
    </ContensCardContainer>
  );
};

export default ContensCard;
