import { styled } from 'styled-components';
import { useState } from 'react';

import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IButtonStyle } from '../../../types/type';

const Container = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.25rem;
  gap: ${cssToken.SPACING['gap-12']};
`;

const OptionDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${cssToken.SPACING['gap-12']};
`;

const OptionButton = ({ svgWidth, svgHeight, children }: IButtonStyle) => {
  const [isActive, setActive] = useState<boolean>(false);
  return (
    <Container>
      {isActive && (
        <OptionDiv>
          {/* 수정 필요 */}
          {children}
        </OptionDiv>
      )}
      <Button
        styles={{ height: cssToken.HEIGHT['h-max'] }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          setActive(!isActive);
        }}
      >
        <svg
          width={svgWidth || '30'}
          height={svgHeight || '12'}
          viewBox="0 0 30 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="27" cy="3" r="3" fill="black" />
          <circle cx="15" cy="3" r="3" fill="black" />
          <circle cx="3" cy="3" r="3" fill="black" />
        </svg>
      </Button>
    </Container>
  );
};

export default OptionButton;
