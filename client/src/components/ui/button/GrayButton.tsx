import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IArgButtonStyle } from '../../../types/type';

const GrayButton = ({
  children,
  width,
  height,
  brradius,
  fontsize,
  onClick,
  isActive,
}: IArgButtonStyle) => {
  return (
    <Button
      className="gray"
      onClick={onClick}
      styles={{
        width,
        height,
        fontsize,
        color: isActive ? cssToken.COLOR.white : cssToken.COLOR.black,
        bgcolor: isActive
          ? cssToken.COLOR['point-500']
          : cssToken.COLOR['gray-500'],
        brradius,
      }}
    >
      {children}
    </Button>
  );
};

export default GrayButton;
