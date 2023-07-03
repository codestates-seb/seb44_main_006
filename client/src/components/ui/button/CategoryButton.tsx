import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IButtonStyle } from '../../../types/type';

const CategoryButton = ({
  children,
  width,
  height,
  isActive,
}: IButtonStyle) => {
  return (
    <Button
      styles={{
        width,
        height,
        color: isActive ? cssToken.COLOR['point-900'] : cssToken.COLOR.black,
        backgroundColor: isActive
          ? cssToken.COLOR['point-100']
          : cssToken.COLOR['gray-300'],
        border: isActive
          ? `${cssToken.BORDER['weight-1']} solid ${cssToken.COLOR['point-900']}`
          : `${cssToken.BORDER['weight-1']} solid ${cssToken.COLOR['gray-700']}`,
        borderRadius: cssToken.BORDER['rounded-none'],
      }}
    >
      {children}
    </Button>
  );
};

export default CategoryButton;
