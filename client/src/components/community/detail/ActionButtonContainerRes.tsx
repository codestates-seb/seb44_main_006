import { styled } from 'styled-components';

import { FlexDiv } from '../../../styles/styles';
import cssToken from '../../../styles/cssToken';
import { StarButton, LikeButton } from '../../ui/button/index';
import Text from '../../ui/text/Text';
import { UserInfoT } from '../../../querys/useUserInfo';

const BtnDiv = styled(FlexDiv)`
  column-gap: ${cssToken.SPACING['gap-12']};
  align-items: center;
  justify-content: start;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const LikeDiv = styled(FlexDiv)`
  height: 70%;
  background-color: ${cssToken.COLOR['gray-300']};
  padding-left: ${cssToken.SPACING['gap-12']};
  padding-right: ${cssToken.SPACING['gap-12']};
  border-radius: ${cssToken.BORDER['rounded-md']};
  align-items: center;
  column-gap: 0.25rem;

  @media screen and (max-width: 768px) {
    height: 2.1875rem;
    font-size: 0.625rem;
    border-radius: ${cssToken.BORDER['rounded-s']};
  }
`;

const ActionButtonContainerRes = ({
  LikeCount,
  isLogin,
  bookmarkStatus,
  likeStatus,
  courseId,
  memberEmail,
  userData,
}: {
  LikeCount: number;
  isLogin: boolean;
  bookmarkStatus: boolean;
  likeStatus: boolean;
  courseId: number;
  memberEmail: string;
  userData: UserInfoT;
}) => {
  return (
    <BtnDiv>
      {isLogin && memberEmail !== userData.memberEmail && (
        <StarButton
          status={bookmarkStatus ? 'del' : 'add'}
          className="communityStar"
          courseId={courseId}
          width="3.75rem"
          height="3.75rem"
          isActive={bookmarkStatus}
        />
      )}
      <LikeDiv>
        {isLogin && (
          <>
            {userData && memberEmail !== userData.memberEmail ? (
              <LikeButton
                className="communityLike"
                isActive={likeStatus}
                courseId={courseId}
              />
            ) : (
              <Text styles={{ weight: cssToken.FONT_WEIGHT.medium }}>
                좋아요
              </Text>
            )}
            {LikeCount}
          </>
        )}
        {!isLogin && (
          <>
            <Text styles={{ weight: cssToken.FONT_WEIGHT.medium }}>좋아요</Text>
            {LikeCount}
          </>
        )}
      </LikeDiv>
    </BtnDiv>
  );
};

export default ActionButtonContainerRes;
