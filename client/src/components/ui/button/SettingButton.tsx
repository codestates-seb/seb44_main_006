import { styled } from 'styled-components';
import { useState } from 'react';

import EventButton from './EventButton';

import cssToken from '../../../styles/cssToken';
import { IButtonStyle } from '../../../types/type';
import SettingIcon from '../../../assets/SettingIcon';

const SettingButton = () => {
  const [isActive, setActive] = useState<boolean>(false);

  return (
    <EventButton
      styles={{
        height: '2.5rem',
        width: '2.5rem',
        borderRadius: '3.125rem',
        border: '1px solid #dcdcdc',
        backgroundColor: `${cssToken.COLOR.white}`
      }}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setActive(!isActive);
      }}
    >
      <SettingIcon />
    </EventButton>
  )
};

export default SettingButton;
