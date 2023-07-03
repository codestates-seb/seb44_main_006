import Button from './Button';

import cssToken from '../../../styles/cssToken';
import { IButtonStyle } from '../../../types/type';

const TagButton = ({ children, width, height, isActive }: IButtonStyle) => {
  return (
    <Button
      styles={{
        width,
        height,
        color: cssToken.COLOR['point-900'],
        backgroundColor: cssToken.COLOR['point-100'],
        borderRadius: cssToken.BORDER['rounded-tag'],
        border: isActive
          ? `${cssToken.BORDER['weight-1']} solid ${cssToken.COLOR['point-900']}`
          : '',
      }}
    >
      {children}
    </Button>
  );
};

export default TagButton;
