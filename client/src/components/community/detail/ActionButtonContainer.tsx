import { styled } from 'styled-components';

import { FlexDiv } from '../../../styles/styles';
import cssToken from '../../../styles/cssToken';
import useUserInfo from '../../../querys/useUserInfo';
import StarButton from '../../ui/button/StarButton';
import LikeButton from '../../ui/button/LikeButton';
import ShareKakaoButton from '../../ui/button/ShareKakaoButton';
import DeleteButton from '../DeleteButton';
import CopyButton from '../../ui/button/CopyButton';

const BtnDiv = styled(FlexDiv)`
  margin-top: -2.625rem;
  column-gap: ${cssToken.SPACING['gap-12']};
  align-items: center;
  justify-content: end;

  > button > svg,
  > div > button > svg {
    width: 1.6rem;
    height: 1.6rem;
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
      width: 1.2rem;
      height: 1.2rem;
    }

    .kakao,
    .copy {
      display: flex;
      justify-content: center;
      align-items: center;
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
    font-size: ${cssToken.TEXT_SIZE['text-12']};
    > p {
      font-size: ${cssToken.TEXT_SIZE['text-12']};
    }
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
        {userData &&
          (userData.isAdmin || memberEmail === userData.memberEmail) && (
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
        <LikeButton
          impossible={!isLogin}
          isMine={userData ? memberEmail === userData.memberEmail : false}
          className="communityLike"
          isActive={likeStatus}
          courseId={courseId}
        />
        {LikeCount}
      </LikeDiv>
    </BtnDiv>
  );
};

export default ActionButtonContainer;
