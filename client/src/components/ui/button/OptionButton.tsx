import { styled } from 'styled-components';

import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IButtonStyle } from '../../../types/type';

const Container = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${cssToken.SPACING['gap-12']};
`;

const OptionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${cssToken.SPACING['gap-12']};
`;

const OptionButton = ({
  svgWidth,
  svgHeight,
  isActive,
  onClick,
  children,
}: IButtonStyle) => {
  return (
    <Container>
      {isActive && (
        <OptionDiv>
          {/* 수정 필요 */}
          {children}
        </OptionDiv>
      )}
      <Button onClick={onClick}>
        <svg
          width={svgWidth || '30'}
          height={svgHeight || '6'}
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
