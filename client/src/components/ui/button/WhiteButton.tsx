import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IArgButtonStyle } from '../../../types/type';

const WhiteButton = ({
  children,
  width,
  height,
  bgcolor,
  brradius,
  onClick,
}: IArgButtonStyle) => {
  return (
    <Button
      onClick={onClick}
      styles={{
        width,
        height,
        color: cssToken.COLOR.black,
        bgcolor: bgcolor || cssToken.COLOR.white,
        brradius,
      }}
    >
      {children}
    </Button>
  );
};

export default WhiteButton;
