import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IButtonStyle } from '../../../types/type';

const SkyBlueButton = ({
  children,
  width,
  height,
  borderRadius,
}: IButtonStyle) => {
  return (
    <Button
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
