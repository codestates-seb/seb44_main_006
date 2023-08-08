import { styled } from 'styled-components';

import { Button640 } from './buttonStyles';

import { IEventButtonStyle, Props } from '../../../types/type';
import cssToken from '../../../styles/cssToken';

export const ButtonTemplate = styled.button<IEventButtonStyle>`
  width: ${(props) => props.width || 'fit-content'};
  height: ${(props) => props.height || 'fit-content'};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  color: ${(props) => props.color};
  background-color: ${(props) =>
    props.disabled ? cssToken.COLOR['gray-700'] : props.bgcolor};
  box-shadow: ${(props) => props.boxShadow};
  border: ${(props) => props.border || 'none'};
  border-radius: ${(props) => props.brradius};
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.gap};

  font-size: ${(props) => props.fontsize || cssToken.TEXT_SIZE['text-16']};
  &.like {
    background-color: transparent;
  }
  &:hover {
    opacity: 0.8;
  }

  @media screen and (max-width: 768px) {
    &.gray {
      ${Button640}
    }

    &.skyblue {
      ${Button640}
    }

    &.communityStar {
      width: 2.1875rem;
      height: 2.1875rem;
    }
  }
`;

const EventButton = ({
  className,
  children,
  styles,
  onClick,
  onSubmit,
  disabled,
}: {
  className?: string;
  children?: Props['children'];
  styles?: IEventButtonStyle;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: () => void;
  disabled?: boolean;
}) => {
  return (
    <ButtonTemplate
      className={className}
      {...styles}
      onClick={onClick}
      onSubmit={onSubmit}
      disabled={disabled}
    >
      {children}
    </ButtonTemplate>
  );
};

export default EventButton;
