import styled, { css } from 'styled-components';
import { memo } from 'react';

import { CardCommonBox } from './Card.styled';

import cssToken from '../../../styles/cssToken';
import {
  TagButton,
  StarButton,
  LikeButton,
  OptionButton,
} from '../button/index';
import ThumbnailBox from '../thumbnail/ThumbnailBox';
import { ContCardInfo } from '../../../types/type';
import getLoginStatus from '../../../utils/getLoginStatus';
import removeTag from '../../../utils/removeTag';
import defaultThumbnail from '../../../assets/defaultThumbnail.webp';
import thousandTok from '../../../utils/thousandTok';
import { CommentIcon, EyeIcon } from '../../../assets';

const ContensCardContainer = styled.section<{ selected?: boolean }>`
  display: flex;
  gap: ${cssToken.SPACING['gap-12']};
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;
  flex-grow: 0;
  width: 20.625rem;
  ${CardCommonBox}
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const UserName = styled.span`
  font-size: 0.8125rem;
  font-weight: ${cssToken.FONT_WEIGHT.medium};
  color: ${cssToken.COLOR.black};
`;

const ContensTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContensHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${cssToken.SPACING['gap-10']};
  height: 2.5rem;
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
  font-size: 1.25rem;
  height: 1.4375rem;
  flex: 1;
  ${TextLimit};
  -webkit-line-clamp: 1;
`;

const ContensText = styled.p`
  line-height: 120%;
  color: ${cssToken.COLOR['gray-900']};
  font-size: 0.875rem;
  font-weight: ${cssToken.FONT_WEIGHT.medium};
  height: 2rem;
  ${TextLimit};
`;

const Tags = styled.div`
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
  > button {
    font-size: 0.75rem;
    padding: 0.1875rem 0.5rem 0.125rem;
  }
`;

const ContensMiddle = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  justify-content: flex-end;
  gap: ${cssToken.SPACING['gap-12']};
  @media (max-width: 768px) {
  }
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssToken.SPACING['gap-10']};
`;

const ContensBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContensCountBox = styled.div`
  display: flex;
  gap: 0.4375rem;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${cssToken.COLOR['gray-900']};
  font-size: 0.75rem;
  gap: 0.125rem;
  > button {
    padding: 0;
  }
  &.comment svg {
    width: 0.9375rem;
    height: 0.9375rem;
  }
  &.eye svg {
    width: 1.3125rem;
    height: 1.3125rem;
  }
`;

const DataText = styled.span`
  font-size: 0.75rem;
  color: ${cssToken.COLOR['gray-900']};
`;

export const ContensCard = memo(
  ({
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
    answerCount,
    courseViewCount,
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
          <UserName>{userName || '탈퇴한 사용자'}</UserName>
          <OptionButton isActive={false}>{children}</OptionButton>
        </ContensTop>

        <ContensMiddle>
          <TextWrap>
            <ContensHeader>
              <ContensTitle>{title}</ContensTitle>
              {isLogin &&
                !isMine &&
                bookmarkStatus !== undefined &&
                courseId && (
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
            {tag && (
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
            )}
          </TextWrap>

          <ThumbnailBox
            styles={{
              width: '100%',
              height: '0',
              brradius: cssToken.BORDER['rounded-s'],
            }}
            src={thumbnail || defaultThumbnail}
          />
        </ContensMiddle>
        <ContensBottom>
          <ContensCountBox>
            <BtnBox>
              {courseId && (
                <LikeButton
                  isActive={likeStatus}
                  courseId={courseId}
                  impossible={!isLogin}
                  isMine={isMine}
                />
              )}
              <DataText>{thousandTok(Number(likeCount))}</DataText>
            </BtnBox>
            {type !== 'course' && (
              <>
                <BtnBox className="comment">
                  <CommentIcon />
                  {thousandTok(Number(answerCount))}
                </BtnBox>
                <BtnBox className="eye">
                  <EyeIcon />
                  {thousandTok(Number(courseViewCount))}
                </BtnBox>
              </>
            )}
          </ContensCountBox>
          <DataText>{date}</DataText>
        </ContensBottom>
      </ContensCardContainer>
    );
  }
);
