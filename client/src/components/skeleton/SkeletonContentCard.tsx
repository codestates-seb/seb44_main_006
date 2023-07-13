import { css, styled } from 'styled-components';

import cssToken from '../../styles/cssToken';
import { FlexDiv } from '../../styles/styles';

const CardContainer = styled.div`
  width: 25.2813rem;
  height: 31.625rem;
  cursor: pointer;
  border: 2px solid ${cssToken.COLOR['gray-500']};
  border-radius: ${cssToken.BORDER['rounded-md']};
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  background-color: ${cssToken.COLOR['gray-500']};
  border-radius: ${cssToken.BORDER['rounded-input']};
`;

const NickDiv = styled(Content)`
  width: 6.25rem;
  height: 1.25rem;
`;

const TitleDiv = styled(Content)`
  width: 15rem;
  height: 3rem;
  ${Content}
`;

const ContentDiv = styled(Content)`
  height: 2.1875rem;
  ${Content}
`;

const TagWrapper = styled(FlexDiv)`
  column-gap: ${cssToken.SPACING['gap-10']};
`;

const TagDiv = styled(Content)`
  border-radius: ${cssToken.BORDER['rounded-tag']};
  width: 3rem;
  height: 1.4375rem;
`;

const ImgDiv = styled(Content)`
  width: 100%;
  height: 11.25rem;
`;

const DateDiv = styled(Content)`
  width: 60%;
  height: 1.4375rem;
  align-self: end;
`;

const SkeletonContentCard = () => {
  return (
    <CardContainer>
      <NickDiv />
      <TitleDiv />
      <ContentDiv />
      <TagWrapper>
        <TagDiv />
        <TagDiv />
      </TagWrapper>
      <ImgDiv />
      <DateDiv />
    </CardContainer>
  );
};

export default SkeletonContentCard;
