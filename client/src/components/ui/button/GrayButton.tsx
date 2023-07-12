import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IArgButtonStyle } from '../../../types/type';

const GrayButton = ({
  children,
  width,
  height,
  borderRadius,
  fontsize,
  onClick,
  isActive,
}: IArgButtonStyle) => {
  return (
    <Button
      onClick={onClick}
      styles={{
        width,
        height,
        fontsize,
        color: isActive ? cssToken.COLOR.white : cssToken.COLOR.black,
        backgroundColor: isActive
          ? cssToken.COLOR['point-900']
          : cssToken.COLOR['gray-500'],
        borderRadius,
      }}
    >
      {children}
    </Button>
  );
};

export default GrayButton;
