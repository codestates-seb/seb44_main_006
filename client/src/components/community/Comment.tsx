import { styled } from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import Text from '../ui/text/Text';
import cssToken from '../../styles/cssToken';
import UserInfoMy from '../ui/UserInfoPfp';
import { FlexDiv } from '../../styles/styles';
import { DeleteComment, PatchComment } from '../../apis/api';
import TextArea from '../ui/input/TextArea';
import useUserInfo from '../../querys/useUserInfo';
import { CommentT } from '../../types/apitype';

const CommentWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: ${cssToken.SPACING['gap-12']};
  border-bottom: 1px solid ${cssToken.COLOR['gray-600']};
  padding-top: ${cssToken.SPACING['gap-16']};
  padding-bottom: ${cssToken.SPACING['gap-16']};
`;

const Button = styled.button`
  cursor: pointer;
  color: #7b7b7b;
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
`;

const Comment = ({
  answererImageUrl: src,
  answererNickname: nickName,
  answerUpdatedAt: date,
  answerContent: content,
  answererEmail: email,
  answerId,
}: CommentT) => {
  const { userData } = useUserInfo();
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setEditing] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const delmutation = useMutation(DeleteComment, {
    onSuccess: () => queryClient.invalidateQueries(['communityDetail']),
  });
  const Patchmutation = useMutation(PatchComment, {
    onSuccess: () => queryClient.invalidateQueries(['communityDetail']),
  });
  const handleDeleteComment = () => {
    if (answerId) delmutation.mutate({ answerId });
  };
  const handlePatchComment = () => {
    if (
      commentRef.current!.value !== content &&
      commentRef.current!.value.trim().length > 0
    ) {
      if (answerId)
        Patchmutation.mutate({
          answerId,
          answerContent: commentRef.current!.value,
        });
    }
    setEditing(false);
  };
  useEffect(() => {
    if (isEditing && commentRef.current) commentRef.current.value = content;
  }, [isEditing, content]);

  return (
    <CommentWrapper>
      <div>
        <UserInfoMy styles={{ size: '4.25rem' }} src={src} />
      </div>
      <FlexAround>
        <FlexBetween>
          <Text
            styles={{
              size: cssToken.TEXT_SIZE['text-18'],
              weight: cssToken.FONT_WEIGHT.bold,
            }}
          >
            {nickName}
          </Text>
          <FlexDiv>
            {userData && userData.memberEmail === email && (
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
                  <Button onClick={handlePatchComment}>수정완료</Button>
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
                  <Button onClick={handleDeleteComment}>삭제</Button>
                )}
              </FlexButtonDiv>
            )}

            <Text
              styles={{
                color: '#7B7B7B',
                weight: cssToken.FONT_WEIGHT.medium,
              }}
            >
              {date}
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
            {content}
          </Text>
        )}
        {isEditing && (
          <TextArea
            ref={commentRef}
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

export default Comment;
