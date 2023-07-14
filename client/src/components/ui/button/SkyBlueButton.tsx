import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IArgButtonStyle } from '../../../types/type';

const SkyBlueButton = ({
  children,
  width,
  height,
  brradius,
  fontsize,
  onClick,
  disabled,
}: IArgButtonStyle) => {
  return (
    <Button
      className="skyblue"
      disabled={disabled}
      onClick={onClick}
      styles={{
        width,
        height,
        fontsize,
        color: cssToken.COLOR.white,
        bgcolor: cssToken.COLOR['point-500'],
        brradius,
      }}
    >
      {children}
    </Button>
  );
};

export default SkyBlueButton;
