import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import cssToken from '../../../styles/cssToken';

const Wrapper = styled.div<{ ishide: boolean; contentHeight: number }>`
  width: 100%;
  height: ${(props) => (props.ishide ? '2rem' : `${props.contentHeight}px`)};
  background-color: transparent;
  position: fixed;
  bottom: 0;
  overflow: hidden;
  transition: height 0.5s ease-in-out;
  border-top-left-radius: ${cssToken.BORDER['rounded-md']};
  border-top-right-radius: ${cssToken.BORDER['rounded-md']};
  border: ${cssToken.BORDER['weight-1']} solid ${cssToken.COLOR['gray-500']};
  z-index: 1000;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.section`
  width: 100%;
  height: 2rem;
  background-color: ${cssToken.COLOR.white};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Content = styled.div`
  height: calc(100% - 2rem);
  overflow-y: auto;
`;

interface Prop {
  children: React.ReactNode;
}

const BottomSheet = ({ children }: Prop) => {
  const [isHide, setIsHide] = useState(true);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsHide(!isHide);
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <Wrapper ishide={isHide} contentHeight={contentHeight}>
      <Header onClick={handleClick}>{isHide ? 'o' : 'x'}</Header>
      <Content ref={contentRef}>{children}</Content>
    </Wrapper>
  );
};

export default BottomSheet;
