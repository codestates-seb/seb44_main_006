import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IButtonStyle } from '../../../types/type';

const SkyBlueButton = ({
  children,
  width,
  height,
  borderRadius,
  onClick,
}: IButtonStyle) => {
  return (
    <Button
      onClick={onClick}
      styles={{
        width,
        height,
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
