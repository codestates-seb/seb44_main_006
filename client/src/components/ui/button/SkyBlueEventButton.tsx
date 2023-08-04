import EventButton from './EventButton';

import cssToken from '../../../styles/cssToken';
import { IEventButtonStyle } from '../../../types/type';

const SkyBlueEventButton = ({
  children,
  width,
  height,
  brradius,
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
        bgcolor: cssToken.COLOR['point-500'],
        brradius,
      }}
    >
      {children}
    </EventButton>
  );
};

export default SkyBlueEventButton;
