import { styled } from 'styled-components';
import { memo, useEffect, useRef, useState } from 'react';

import DeleteCommentButton from './DeleteCommentButton';
import { Button } from './styles';
import PatchCommentButton from './PatchCommentButton';

import Text from '../../ui/text/Text';
import UserInfoMy from '../../ui/UserInfoPfp';
import { FlexDiv } from '../../../styles/styles';
import TextArea from '../../ui/input/TextArea';
import useUserInfo from '../../../querys/useUserInfo';
import { CommentT } from '../../../types/apitype';
import cssToken from '../../../styles/cssToken';

const CommentWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: ${cssToken.SPACING['gap-12']};
  border-bottom: 1px solid ${cssToken.COLOR['gray-600']};
  padding-top: ${cssToken.SPACING['gap-16']};
  padding-bottom: ${cssToken.SPACING['gap-16']};

  @media screen and (max-width: 768px) {
    img {
      width: 2.3125rem;
      height: 2.3125rem;
    }
    p {
      font-size: ${cssToken.TEXT_SIZE['text-12']};
      line-height: 1.2rem;
    }
  }
`;

const FlexButtonDiv = styled(FlexDiv)`
  column-gap: 0.0625rem;
  margin-right: ${cssToken.SPACING['gap-10']};
`;

const FlexBetween = styled(FlexDiv)`
  justify-content: space-between;
  margin-bottom: ${cssToken.SPACING['gap-12']};
`;

const FlexAround = styled(FlexDiv)`
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  @media screen and (max-width: 768px) {
    textarea {
      height: 3.125rem;
      font-size: 0.75rem;
    }
  }
`;

const UserDiv = styled.div`
  @media screen and (max-width: 768px) {
    div {
      width: fit-content;
      height: fit-content;
    }
  }
`;
// Todo isEditing 상태에 따라 아예 나누는게 어떤지?
const Comment = ({
  answererImageUrl: commenterImageUrl,
  answererNickname: commenterNickName,
  answerUpdatedAt: commentUpdateDate,
  answerContent: previousComment,
  answererEmail: commenterEmail,
  answerId: commentId,
}: CommentT) => {
  const [newComment, setNewComment] = useState(previousComment);

  const { userData } = useUserInfo();
  const isSamePerson = userData
    ? userData.memberEmail === commenterEmail
    : false;

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const [isEditing, setEditing] = useState<boolean>(false);
  useEffect(() => {
    if (isEditing && commentRef.current)
      commentRef.current.value = previousComment;
  }, [isEditing, previousComment]);

  return (
    <CommentWrapper>
      <UserDiv>
        <UserInfoMy styles={{ size: '4.25rem' }} src={commenterImageUrl} />
      </UserDiv>
      <FlexAround>
        <FlexBetween>
          <Text
            styles={{
              size: cssToken.TEXT_SIZE['text-18'],
              weight: cssToken.FONT_WEIGHT.bold,
            }}
          >
            {commenterNickName}
          </Text>
          <FlexDiv>
            {userData && (userData.isAdmin || isSamePerson) && (
              <FlexButtonDiv>
                {!isEditing && (
                  <Button
                    onClick={() => {
                      setEditing(true);
                    }}
                  >
                    수정
                  </Button>
                )}
                {isEditing && (
                  <PatchCommentButton
                    newComment={newComment}
                    previousComment={previousComment}
                    commentId={commentId}
                    setEditing={setEditing}
                  />
                )}
                {isEditing ? (
                  <Button
                    onClick={() => {
                      setEditing(false);
                    }}
                  >
                    취소
                  </Button>
                ) : (
                  <DeleteCommentButton commentId={commentId} />
                )}
              </FlexButtonDiv>
            )}
            <Text
              styles={{
                color: '#7B7B7B',
                weight: cssToken.FONT_WEIGHT.medium,
              }}
            >
              {commentUpdateDate}
            </Text>
          </FlexDiv>
        </FlexBetween>
        {!isEditing && (
          <Text
            styles={{
              size: cssToken.TEXT_SIZE['text-18'],
              weight: cssToken.FONT_WEIGHT.medium,
            }}
          >
            {previousComment}
          </Text>
        )}
        {isEditing && (
          <TextArea
            ref={commentRef}
            onChange={() => {
              setNewComment((prev: string) =>
                commentRef.current ? commentRef.current.value : prev
              );
            }}
            styles={{
              width: cssToken.WIDTH['w-full'],
              height: cssToken.HEIGHT['h-fit'],
              type: 'comment',
            }}
            isValidate
            description=""
          />
        )}
      </FlexAround>
    </CommentWrapper>
  );
};

export default memo(Comment);
