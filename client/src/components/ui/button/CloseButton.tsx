import Button from './Button';

import { IArgButtonStyle } from '../../../types/type';

const CloseButton = ({ svgWidth, svgHeight, onClick }: IArgButtonStyle) => {
  return (
    <Button onClick={onClick}>
      <svg
        width={svgWidth || '20'}
        height={svgHeight || '20'}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 20L0 18L8 10L0 2L2 0L10 8L18 0L20 2L12 10L20 18L18 20L10 12L2 20Z"
          fill="black"
        />
      </svg>
    </Button>
  );
};

export default CloseButton;
