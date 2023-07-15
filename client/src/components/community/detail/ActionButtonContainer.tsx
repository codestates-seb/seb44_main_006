import { styled } from 'styled-components';

import { FlexDiv } from '../../../styles/styles';
import cssToken from '../../../styles/cssToken';
import StarButton from '../../ui/button/StarButton';
import LikeButton from '../../ui/button/LikeButton';
import Text from '../../ui/text/Text';
import DeleteButton from '../DeleteButton';
import useUserInfo from '../../../querys/useUserInfo';
import ShareKakaoButton from '../../ui/button/ShareKakaoButton';
import CopyButton from '../../ui/button/CopyButton';

const BtnDiv = styled(FlexDiv)`
  column-gap: ${cssToken.SPACING['gap-12']};
  align-items: center;
  justify-content: start;

  @media screen and (max-width: 768px) {
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
`;

const ActionButtonContainer = ({
  LikeCount,
  isLogin,
  postId,
  bookmarkStatus,
  likeStatus,
  courseId,
  memberEmail,
}: {
  LikeCount: number;
  isLogin: boolean;
  postId: string;
  bookmarkStatus: boolean;
  likeStatus: boolean;
  courseId: number;
  memberEmail: string;
}) => {
  const { userData } = useUserInfo();

  return (
    <BtnDiv>
      <>
        <CopyButton endpoint={`community/${postId}`} />
        <ShareKakaoButton endpoint={`community/${postId}`} />
        {userData && memberEmail === userData.memberEmail && (
          <DeleteButton postId={postId} />
        )}
      </>
      {isLogin && userData && memberEmail !== userData.memberEmail && (
        <StarButton
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

export default ActionButtonContainer;
