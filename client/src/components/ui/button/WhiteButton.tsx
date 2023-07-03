import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { Props } from '../../../types/type';

const WhiteButton = ({
  children,
  width,
  height,
  backgroundColor,
  borderRadius,
}: {
  children: Props['children'];
  width: string;
  height: string;
  backgroundColor?: string;
  borderRadius: string;
}) => {
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
