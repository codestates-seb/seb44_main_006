import { styled } from 'styled-components';

import { IArgButtonStyle, Props } from '../../../types/type';
import cssToken from '../../../styles/cssToken';

const ButtonTemplate = styled.button<IArgButtonStyle>`
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

  @media screen and (max-width: 640px) {
    font-size: 0.875rem;
    width: fit-content;
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;

const Button = ({
  children,
  styles,
  onClick,
  onSubmit,
  disabled,
}: {
  children?: Props['children'];
  styles?: IArgButtonStyle;
  onClick?: (arg0?: string | undefined) => void;
  onSubmit?: () => void;
  disabled?: boolean;
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
