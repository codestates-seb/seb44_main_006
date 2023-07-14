import { useState } from 'react';

import EventButton from './EventButton';

import cssToken from '../../../styles/cssToken';
import SettingIcon from '../../../assets/SettingIcon';

const SettingButton = () => {
  const [isActive, setActive] = useState<boolean>(false);

  return (
    <EventButton
      styles={{
        height: '2.5rem',
        width: '2.5rem',
        borderRadius: '3.125rem',
        border: `1px solid ${cssToken.COLOR['gray-600']}`,
        backgroundColor: `${cssToken.COLOR.white}`,
      }}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setActive(!isActive);
      }}
    >
      <SettingIcon />
    </EventButton>
  );
};

export default SettingButton;
