import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IArgButtonStyle } from '../../../types/type';

const TagButton = ({
  children,
  width,
  height,
  onClick,
  tagname,
  selectedid,
}: IArgButtonStyle) => {
  const isActive = !!(selectedid && selectedid === tagname);

  return (
    <Button
      onClick={() => (onClick ? onClick(tagname) : '')}
      styles={{
        width,
        height,
        color: cssToken.COLOR['point-500'],
        bgcolor: cssToken.COLOR['point-100'],
        brradius: cssToken.BORDER['rounded-tag'],
        border: isActive
          ? `${cssToken.BORDER['weight-1']} solid ${cssToken.COLOR['point-500']}`
          : `${cssToken.BORDER['weight-1']} solid transparent`,
      }}
    >
      {children}
    </Button>
  );
};

export default TagButton;
