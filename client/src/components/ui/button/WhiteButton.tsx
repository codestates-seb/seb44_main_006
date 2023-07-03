import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IButtonStyle } from '../../../types/type';

const WhiteButton = ({
  children,
  width,
  height,
  backgroundColor,
  borderRadius,
}: IButtonStyle) => {
  return (
    <Button
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
