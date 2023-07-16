import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IArgButtonStyle } from '../../../types/type';

const CircleButton = ({
  children,
  width,
  height,
  onClick,
}: IArgButtonStyle) => {
  return (
    <Button
      className="circle"
      onClick={onClick}
      styles={{
        width,
        height,
        color: cssToken.COLOR.black,
        bgcolor: cssToken.COLOR.white,
        brradius: cssToken.BORDER['rounded-full'],
        boxShadow: cssToken.SHADOW['shadow-lg'],
      }}
    >
      {children}
    </Button>
  );
};

export default CircleButton;
