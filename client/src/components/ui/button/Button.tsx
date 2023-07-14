import { styled } from 'styled-components';

import { Button640 } from './buttonStyles';

import { IArgButtonStyle, Props } from '../../../types/type';
import cssToken from '../../../styles/cssToken';

export const ButtonTemplate = styled.button<IArgButtonStyle>`
  width: ${(props) => props.width || 'fit-content'};
  height: ${(props) => props.height || 'fit-content'};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  color: ${(props) => props.color};
  background-color: ${(props) =>
    props.disabled ? cssToken.COLOR['gray-700'] : props.backgroundColor};
  box-shadow: ${(props) => props.boxShadow};
  border: ${(props) => props.border || 'none'};
  border-radius: ${(props) => props.borderRadius};
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.gap};

  font-size: ${(props) => props.fontsize || cssToken.TEXT_SIZE['text-16']};

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

    &.circle {
      width: 4.375rem;
      height: 4.375rem;
      > div {
        font-size: 0.625rem;
        > svg {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
`;

const Button = ({
  children,
  styles,
  onClick,
  onSubmit,
  disabled,
  className,
}: {
  className?: string;
  children?: Props['children'];
  styles?: IArgButtonStyle;
  onClick?: (arg0?: string | undefined) => void;
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

export default Button;
