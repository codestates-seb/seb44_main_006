import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { Props } from '../../../types/type';

const CircleButton = ({
  children,
  width,
  height,
}: {
  children: Props['children'];
  width: string;
  height: string;
}) => {
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
