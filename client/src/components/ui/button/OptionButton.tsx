import { styled } from 'styled-components';
import { useState } from 'react';

import EventButton from './EventButton';
import { BUTTON_STYLES } from './buttonStyles';

import cssToken from '../../../styles/cssToken';
import { IButtonStyle } from '../../../types/type';

const Container = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.25rem;
  gap: ${cssToken.SPACING['gap-10']};

  > button {
    ${BUTTON_STYLES.nobgbtn};
  }
`;

const OptionDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  > button {
    padding: 0;
  }
`;

const OptionButton = ({ svgWidth, svgHeight, children }: IButtonStyle) => {
  const [isActive, setActive] = useState<boolean>(false);
  return (
    <Container>
      {isActive && <OptionDiv>{children}</OptionDiv>}
      <EventButton
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          setActive(!isActive);
        }}
      >
        <svg
          width={svgWidth || '20'}
          height={svgHeight || '12'}
          viewBox="0 0 30 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="27"
            cy="3"
            r="3"
            fill={
              isActive
                ? `${cssToken.COLOR.black}`
                : `${cssToken.COLOR['gray-600']}`
            }
          />
          <circle
            cx="15"
            cy="3"
            r="3"
            fill={
              isActive
                ? `${cssToken.COLOR.black}`
                : `${cssToken.COLOR['gray-600']}`
            }
          />
          <circle
            cx="3"
            cy="3"
            r="3"
            fill={
              isActive
                ? `${cssToken.COLOR.black}`
                : `${cssToken.COLOR['gray-600']}`
            }
          />
        </svg>
      </EventButton>
    </Container>
  );
};

export default OptionButton;
