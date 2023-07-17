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
  margin-top: -2.625rem;
  column-gap: ${cssToken.SPACING['gap-12']};
  align-items: center;
  justify-content: end;

  > button > svg,
  > div > button > svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  .kakao,
  .copy {
    width: fit-content;
    height: fit-content;
    svg {
      width: 2rem;
      height: 2rem;
    }
  }

  @media screen and (max-width: 768px) {
    margin-top: 0;

    > button > svg,
    > div > button > svg {
      width: 1rem;
      height: 1rem;
    }

    .kakao,
    .copy {
      svg {
        width: 1.4rem;
        height: 1.4rem;
      }
    }
  }
`;

const LikeDiv = styled(FlexDiv)`
  height: 3.75rem;
  background-color: ${cssToken.COLOR['gray-300']};
  padding-left: ${cssToken.SPACING['gap-12']};
  padding-right: ${cssToken.SPACING['gap-12']};
  border-radius: ${cssToken.BORDER['rounded-md']};
  align-items: center;
  column-gap: 0.25rem;

  @media screen and (max-width: 768px) {
    height: 2.1875rem;
  }
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
  const { userData } = useUserInfo(isLogin);

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

export default ActionButtonContainer;
