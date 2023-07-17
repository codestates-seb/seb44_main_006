import { styled } from 'styled-components';

import cssToken from '../../styles/cssToken';
import { FlexDiv, SkeletonDiv } from '../../styles/styles';

const UserContainer = styled(FlexDiv)`
  column-gap: ${cssToken.SPACING['gap-24']};
  @media screen and (max-width: 768px) {
    .skeletonImg {
      width: 3.3125rem;
      height: 3.3125rem;
    }

    .skeletonUserWrapper {
      height: 3.3125rem;
      row-gap: 0.3125rem;
    }

    .skeletonNickName {
      width: 3.125rem;
      height: 1.125rem;
    }

    .skeletonDate {
      width: 4.8125rem;
      height: 1.125rem;
    }
  }
`;

const UserImg = styled(SkeletonDiv)`
  border-radius: ${cssToken.BORDER['rounded-full']};
  width: 10.75rem;
  height: 10.75rem;
`;

const UserWrapper = styled(FlexDiv)`
  flex-direction: column;
  justify-content: space-evenly;
`;

const NickNameDiv = styled(SkeletonDiv)`
  width: 12.5rem;
  height: 3.875rem;
`;

const DateDiv = styled(SkeletonDiv)`
  width: 5.5rem;
  height: 2.1875rem;
`;

const SkeletonUserInfoContainer = () => {
  return (
    <UserContainer>
      <UserImg className="skeletonImg" />
      <UserWrapper className="skeletonUserWrapper">
        <NickNameDiv className="skeletonNickName" />
        <DateDiv className="skeletonDate" />
      </UserWrapper>
    </UserContainer>
  );
};

export default SkeletonUserInfoContainer;
