import styled, { css } from 'styled-components';

import { CardCommonBox } from './Card.styled';

import { BUTTON_STYLES } from '../button/buttonStyles';
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
  gap: ${cssToken.SPACING['gap-12']};
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;
  flex-grow: 0;
  width: 20.625rem;
  ${CardCommonBox}
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const UserName = styled.span`
  font-size: 13px;
  font-weight: ${cssToken.FONT_WEIGHT.medium};
  color: ${cssToken.COLOR['gray-900']};
`;

const ContensTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.9375rem;
`;

const ContensHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${cssToken.SPACING['gap-10']};
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const TextLimit = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const ContensTitle = styled.h3`
  line-height: 120%;
  font-size: 20px;
  height: 1.4375rem;
  flex: 1;
  ${TextLimit};
  -webkit-line-clamp: 1;
`;

const ContensText = styled.p`
  line-height: 120%;
  color: ${cssToken.COLOR['gray-900']};
  font-size: 14px;
  font-weight: ${cssToken.FONT_WEIGHT.medium};
  height: 2rem;
  ${TextLimit};
`;

const Tags = styled.div`
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
  > button {
    font-size: 12px;
    padding: 6px 8px 4px;
  }
`;

const ContensMiddle = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssToken.SPACING['gap-12']};
  @media (max-width: 768px) {
  }
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  > button {
    ${BUTTON_STYLES.nobgbtn}
    margin-right: 3px;
  }
`;

const DataText = styled.span`
  font-size: ${cssToken.TEXT_SIZE['text-14']};
  color: ${cssToken.COLOR['gray-900']};
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
  date,
  isMine,
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

      <ContensMiddle>
        <TextWrap>
          <ContensHeader>
            <ContensTitle>{title}</ContensTitle>
            {isLogin && !isMine && bookmarkStatus !== undefined && courseId && (
              <StarButton
                status={bookmarkStatus ? 'del' : 'add'}
                width="40px"
                height="40px"
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
        </TextWrap>

        <ThumbnailBox
          styles={{
            width: '100%',
            height: '0',
            brradius: cssToken.BORDER['rounded-s'],
          }}
          src={thumbnail}
        />
      </ContensMiddle>
      <ContensBottom>
        <LikeBtnBox>
          {isLogin && !isMine && likeStatus !== undefined && courseId && (
            <LikeButton isActive={likeStatus} courseId={courseId} />
          )}
          <DataText>{likeCount} likes</DataText>
        </LikeBtnBox>
        <DataText>{date}</DataText>
      </ContensBottom>
    </ContensCardContainer>
  );
};

export default ContensCard;
