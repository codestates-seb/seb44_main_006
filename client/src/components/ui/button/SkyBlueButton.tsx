import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { Props } from '../../../types/type';

const SkyBlueButton = ({
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
