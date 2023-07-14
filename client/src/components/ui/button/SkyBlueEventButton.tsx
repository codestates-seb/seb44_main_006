import EventButton from './EventButton';

import cssToken from '../../../styles/cssToken';
import { IEventButtonStyle } from '../../../types/type';

const SkyBlueEventButton = ({
  children,
  width,
  height,
  borderRadius,
  fontsize,
  onClick,
  disabled,
}: IEventButtonStyle) => {
  return (
    <EventButton
      className="skyblue"
      disabled={disabled}
      onClick={onClick}
      styles={{
        width,
        height,
        fontsize,
        color: cssToken.COLOR.white,
        backgroundColor: cssToken.COLOR['point-900'],
        borderRadius,
      }}
    >
      {children}
    </EventButton>
  );
};

export default SkyBlueEventButton;
