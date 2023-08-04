import EventButton from './EventButton';

import cssToken from '../../../styles/cssToken';
import { IEventButtonStyle } from '../../../types/type';

const GrayEventButton = ({
  children,
  width,
  height,
  brradius,
  fontsize,
  onClick,
  isActive,
}: IEventButtonStyle) => {
  return (
    <EventButton
      className="gray"
      onClick={onClick}
      styles={{
        width,
        height,
        fontsize,
        color: isActive ? cssToken.COLOR.white : cssToken.COLOR.black,
        bgcolor: isActive
          ? cssToken.COLOR['point-500']
          : cssToken.COLOR['gray-500'],
        brradius,
      }}
    >
      {children}
    </EventButton>
  );
};

export default GrayEventButton;
