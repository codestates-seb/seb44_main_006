import { styled } from 'styled-components';

import SkeletonLocationContainer from './SkeletonLocationContainer';

import cssToken from '../../../styles/cssToken';
import { FlexDiv, SkeletonDiv } from '../../../styles/styles';
import { TitleDiv } from '../../skeleton/SkeletonContentCard';

const Wrapper = styled(FlexDiv)`
  flex-direction: column;
  row-gap: ${cssToken.SPACING['gap-20']};
  flex: 1.5;
`;

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
  width: 5.3125rem;
  height: 5.3125rem;
`;

const UserWrapper = styled(FlexDiv)`
  flex-direction: column;
  justify-content: space-evenly;
`;

const NickNameDiv = styled(SkeletonDiv)`
  width: 10rem;
  height: 1.5rem;
`;

const DateDiv = styled(SkeletonDiv)`
  width: 8.125rem;
  height: 1.5rem;
`;

const ScheduleDiv = styled(FlexDiv)`
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 60);
  overflow: auto;
  row-gap: ${cssToken.SPACING['gap-12']};
`;

const SkeletonUserContainer = () => {
  return (
    <Wrapper>
      <UserContainer>
        <UserImg className="skeletonImg" />
        <UserWrapper className="skeletonUserWrapper">
          <NickNameDiv className="skeletonNickName" />
          <DateDiv className="skeletonDate" />
        </UserWrapper>
      </UserContainer>
      <ScheduleDiv>
        <TitleDiv className="skeletonMapTitle" />
        <SkeletonLocationContainer length={3} />
      </ScheduleDiv>
    </Wrapper>
  );
};

export default SkeletonUserContainer;
