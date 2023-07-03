import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IButtonStyle } from '../../../types/type';

const GrayButton = ({
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
        color: cssToken.COLOR.black,
        backgroundColor: cssToken.COLOR['gray-500'],
        borderRadius,
      }}
    >
      {children}
    </Button>
  );
};

export default GrayButton;
