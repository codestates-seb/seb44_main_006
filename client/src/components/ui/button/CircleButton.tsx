import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IButtonStyle } from '../../../types/type';

const CircleButton = ({ children, width, height }: IButtonStyle) => {
  return (
    <Button
      styles={{
        width,
        height,
        color: cssToken.COLOR.black,
        backgroundColor: cssToken.COLOR.white,
        borderRadius: cssToken.BORDER['rounded-full'],
        boxShadow: cssToken.SHADOW['shadow-lg'],
      }}
    >
      {children}
    </Button>
  );
};

export default CircleButton;
