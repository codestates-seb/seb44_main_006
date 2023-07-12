import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IArgButtonStyle } from '../../../types/type';

const WhiteButton = ({
  children,
  width,
  height,
  backgroundColor,
  borderRadius,
  onClick,
}: IArgButtonStyle) => {
  return (
    <Button
      onClick={onClick}
      styles={{
        width,
        height,
        color: cssToken.COLOR.black,
        backgroundColor: backgroundColor || cssToken.COLOR.white,
        borderRadius,
      }}
    >
      {children}
    </Button>
  );
};

export default WhiteButton;
