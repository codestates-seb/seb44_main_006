import styled, { css } from 'styled-components';

import { CardCommonBox } from './Card.styled';

import cssToken from '../../../styles/cssToken';
import TagButton from '../button/TagButton';
import ThumbnailBox from '../thumbnail/ThumbnailBox';
import OptionButton from '../button/OptionButton';
import StarButton from '../button/StarButton';
import LikeButton from '../button/LikeButton';
import { ContCardInfo } from '../../../types/type';
import getLoginStatus from '../../../utils/getLoginStatus';
import removeTag from '../../../utils/removeTag';

const ContensCardContainer = styled.section<{ selected?: boolean }>`
  display: flex;
  gap: ${cssToken.SPACING['gap-24']};
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;
  flex-grow: 0;
  width: 25.2813rem;
  ${CardCommonBox}
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
  thumbnail,
  onClick,
  selectId,
  postId,
  courseId,
  children,
  likeStatus,
  bookmarkStatus,
  type,
}: ContCardInfo) => {
  const isLogin = getLoginStatus();
  const selected = selectId !== undefined && selectId === courseId;
  return (
    <ContensCardContainer
      onClick={() => {
        if (onClick) {
          if (type === 'course' && courseId) onClick(courseId);
          else if (type === 'post' && postId) onClick(postId);
        }
      }}
      selected={selected}
    >
      <ContensTop>
        <UserName>{userName || '탈퇴한 회원'}</UserName>
        <OptionButton isActive={false}>{children}</OptionButton>
      </ContensTop>

      <ContensHeader>
        <ContensTitle>{title}</ContensTitle>
        {isLogin && bookmarkStatus !== undefined && courseId && (
          <StarButton
            width="60px"
            height="60px"
            isActive={bookmarkStatus}
            courseId={courseId}
          />
        )}
      </ContensHeader>
      {text && <ContensText>{removeTag(text)}</ContensText>}
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
        src={thumbnail}
      />

      <ContensBottom>
        <LikeBtnBox>
          {isLogin && likeStatus !== undefined && courseId && (
            <LikeButton isActive={likeStatus} courseId={courseId} />
          )}
          <DataText>{likeCount}개</DataText>
        </LikeBtnBox>
        <DataText>23.06.30</DataText>
      </ContensBottom>
    </ContensCardContainer>
  );
};

export default ContensCard;
