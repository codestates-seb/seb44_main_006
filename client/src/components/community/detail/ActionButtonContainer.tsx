import { styled } from 'styled-components';
import { useState } from 'react';

import { FlexDiv } from '../../../styles/styles';
import cssToken from '../../../styles/cssToken';
import StarButton from '../../ui/button/StarButton';
import LikeButton from '../../ui/button/LikeButton';
import Text from '../../ui/text/Text';
import DeleteButton from '../DeleteButton';

const BtnDiv = styled(FlexDiv)`
  column-gap: ${cssToken.SPACING['gap-12']};
  align-items: center;
`;

const StarDiv = styled(FlexDiv)`
  height: 70%;
  background-color: ${cssToken.COLOR['gray-300']};
  padding-left: ${cssToken.SPACING['gap-12']};
  padding-right: ${cssToken.SPACING['gap-12']};
  border-radius: ${cssToken.BORDER['rounded-md']};
  align-items: center;
  column-gap: 0.25rem;
`;

const ActionButtonContainer = ({
  LikeCount,
  isLogin,
  postId,
  bookmarkStatus,
  likeStatus,
  courseId,
}: {
  LikeCount: number;
  isLogin: boolean;
  postId: string;
  bookmarkStatus: boolean;
  likeStatus: boolean;
  courseId: number;
}) => {
  return (
    <BtnDiv>
      <DeleteButton postId={postId} />
      {isLogin && (
        <StarButton
          courseId={courseId}
          width="3.75rem"
          height="3.75rem"
          isActive={bookmarkStatus}
        />
      )}
      <StarDiv>
        {isLogin && (
          <>
            <LikeButton isActive={likeStatus} courseId={courseId} />
            {LikeCount}
          </>
        )}
        {!isLogin && (
          <>
            <Text styles={{ weight: cssToken.FONT_WEIGHT.medium }}>좋아요</Text>
            {LikeCount}
          </>
        )}
      </StarDiv>
    </BtnDiv>
  );
};

export default ActionButtonContainer;
