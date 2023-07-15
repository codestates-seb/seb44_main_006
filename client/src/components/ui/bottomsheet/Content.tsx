import { ReactNode, forwardRef } from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div<{ wrapperHeight: number }>`
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    height: ${(props) => `${props.wrapperHeight * 0.8}px`};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-height: 700px) {
    height: ${(props) => `${props.wrapperHeight * 0.75}px`};
  }

  @media (max-height: 600px) {
    height: ${(props) => `${props.wrapperHeight * 0.7}px`};
  }
`;

interface ContentProps {
  children?: ReactNode;
  wrapperHeight: number;
}

const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ children, wrapperHeight }, ref) => {
    return (
      <ContentWrapper ref={ref} wrapperHeight={wrapperHeight}>
        {children}
      </ContentWrapper>
    );
  }
);

export default Content;
