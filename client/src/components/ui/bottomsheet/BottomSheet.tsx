import React, { useState } from 'react';
import styled from 'styled-components';

import cssToken from '../../../styles/cssToken';

const Wrapper = styled.div<{
  ishide: boolean;
  contentHeight: number;
  param?: string;
}>`
  width: 100%;
  height: 100vh;
  background-color: ${cssToken.COLOR.white};
  overflow: hidden;
  transition: height 0.5s ease-in-out;
  flex: 0 0 25rem;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    overflow: ${(props) => props.param === 'detail' && 'auto'};
    height: ${(props) => {
      if (props.ishide) {
        return `calc(${cssToken.HEIGHT['bottomsheet-header']} + ${cssToken.HEIGHT['mo-nav-height']})`;
      }
      if (props.param === 'detail') {
        return `${props.contentHeight / 2 + 360}px`;
      }
      return `${props.contentHeight - 48}px`;
    }};
    border-top-left-radius: ${cssToken.BORDER['rounded-md']};
    border-top-right-radius: ${cssToken.BORDER['rounded-md']};
    border: ${cssToken.BORDER['weight-1']} solid ${cssToken.COLOR['gray-500']};
  }

  @media (max-width: 1280px) {
    flex: 0 0 21rem;
  }
`;

const Header = styled.section`
  display: none;

  @media (max-width: 768px) {
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: ${cssToken.COLOR.white};
    cursor: pointer;
  }
`;

const Content = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    .scheduleBox {
      height: 91vh;
    }
  }

  @media (max-width: 640px) {
    .scheduleBox {
      height: 80vh;
    }
  }
`;

const Handle = styled.div`
  width: 2rem;
  height: 4px;
  border-radius: ${cssToken.BORDER['rounded-s']};
  background-color: ${cssToken.COLOR['gray-700']};
`;

interface Prop {
  children: React.ReactNode;
  param?: string;
}

const BottomSheet = ({ children, param }: Prop) => {
  const [isHide, setIsHide] = useState(true);

  const handleClick = () => {
    setIsHide(!isHide);
  };

  return (
    <Wrapper ishide={isHide} contentHeight={window.innerHeight} param={param}>
      <Header onClick={handleClick}>
        <Handle />
      </Header>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default BottomSheet;
