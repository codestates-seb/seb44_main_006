import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { Props } from '../../../types/type';

const GrayButton = ({
  children,
  width,
  height,
  borderRadius,
}: {
  children: Props['children'];
  width: string;
  height: string;
  borderRadius: string;
}) => {
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
