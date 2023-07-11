import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IArgButtonStyle } from '../../../types/type';

const SkyBlueButton = ({
  children,
  width,
  height,
  borderRadius,
  fontsize,
  onClick,
  disabled,
}: IArgButtonStyle) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      styles={{
        width,
        height,
        fontsize,
        color: cssToken.COLOR.white,
        backgroundColor: cssToken.COLOR['point-900'],
        borderRadius,
      }}
    >
      {children}
    </Button>
  );
};

export default SkyBlueButton;
