import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IArgButtonStyle } from '../../../types/type';

const CategoryButton = ({
  children,
  width,
  height,
  onClick,
  categoryname,
  selectedid,
}: IArgButtonStyle) => {
  const isActive = !!(selectedid && selectedid === categoryname);

  return (
    <Button
      onClick={() => (onClick ? onClick(categoryname) : '')}
      styles={{
        width,
        height,
        color: isActive ? cssToken.COLOR['point-500'] : cssToken.COLOR.black,
        bgcolor: isActive ? cssToken.COLOR['point-100'] : cssToken.COLOR.white,
        border: isActive
          ? `${cssToken.BORDER['weight-1']} solid ${cssToken.COLOR['point-500']}`
          : `${cssToken.BORDER['weight-1']} solid ${cssToken.COLOR['gray-500']}`,
        brradius: cssToken.BORDER['rounded-none'],
        categoryname,
      }}
    >
      {children}
    </Button>
  );
};

export default CategoryButton;
