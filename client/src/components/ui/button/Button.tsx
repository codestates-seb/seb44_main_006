import { styled } from 'styled-components';

import { IButtonStyle, Props } from '../../../types/type';
import cssToken from '../../../styles/cssToken';

const ButtonTemplate = styled.button<IButtonStyle>`
  width: ${(props) => props.width || 'fit-content'};
  height: ${(props) => props.height || 'fit-content'};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  color: ${(props) =>
    props.disabled === 'true' ? cssToken.COLOR['gray-700'] : props.color};
  background-color: ${(props) => props.backgroundColor};
  box-shadow: ${(props) => props.boxShadow};
  border: ${(props) => props.border || 'none'};
  border-radius: ${(props) => props.borderRadius};

  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.gap};
`;

const Button = ({
  children,
  styles,
  onClick,
  onSubmit,
  disabled,
}: {
  children?: Props['children'];
  styles?: IButtonStyle;
  onClick?: (arg0?: string) => void;
  onSubmit?: () => void;
  disabled?: 'true' | 'false';
}) => {
  return (
    <ButtonTemplate
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
