import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IButtonStyle } from '../../../types/type';

const GrayButton = ({
  children,
  width,
  height,
  borderRadius,
  onClick,
  isActive,
}: IButtonStyle) => {
  return (
    <Button
      onClick={onClick}
      styles={{
        width,
        height,
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
