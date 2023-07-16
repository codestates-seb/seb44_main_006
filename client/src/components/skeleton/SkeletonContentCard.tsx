import { styled } from 'styled-components';

import cssToken from '../../styles/cssToken';
import { FlexDiv, SkeletonDiv } from '../../styles/styles';

const CardContainer = styled.div`
  width: 20.625rem;
  cursor: pointer;
  border: 2px solid ${cssToken.COLOR['gray-500']};
  border-radius: ${cssToken.BORDER['rounded-md']};
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: ${cssToken.SPACING['gap-20']};

  @media screen and (max-width: 768px) {
    &.skeletonCardContainer {
      width: 100%;
      height: 23.5313rem;
    }

    .skeletonImg {
      width: 100%;
      height: 9.0938rem;
    }
  }
`;

const NickDiv = styled(SkeletonDiv)`
  width: 6.25rem;
  height: 1.25rem;
`;

export const TitleDiv = styled(SkeletonDiv)`
  width: 15rem;
  height: 1.4375rem;
`;

const ContentDiv = styled(SkeletonDiv)`
  height: 2rem;
`;

const TagWrapper = styled(FlexDiv)`
  column-gap: ${cssToken.SPACING['gap-10']};
`;

const TagDiv = styled(SkeletonDiv)`
  border-radius: ${cssToken.BORDER['rounded-tag']};
  width: 3rem;
  height: 1.4375rem;
`;

const ImgDiv = styled(SkeletonDiv)`
  width: 100%;
  height: 11.25rem;
`;

const DateDiv = styled(SkeletonDiv)`
  width: 60%;
  height: 1.4375rem;
  align-self: end;
`;

const SkeletonContentCard = () => {
  return (
    <CardContainer className="skeletonCardContainer">
      <NickDiv />
      <TitleDiv />
      <ContentDiv />
      <TagWrapper>
        <TagDiv />
        <TagDiv />
      </TagWrapper>
      <ImgDiv className="skeletonImg" />
      <DateDiv />
    </CardContainer>
  );
};

export default SkeletonContentCard;
