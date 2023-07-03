import { styled } from 'styled-components';

import { IButtonStyle, Props } from '../../../types/type';

const ButtonTemplate = styled.button<IButtonStyle>`
  width: ${(props) => props.width || 'fit-content'};
  height: ${(props) => props.height || 'fit-content'};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  color: ${(props) => props.color};
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
}: {
  children?: Props['children'];
  styles?: IButtonStyle;
  onClick?: () => void;
  onSubmit?: () => void;
}) => {
  return (
    <ButtonTemplate {...styles} onClick={onClick} onSubmit={onSubmit}>
      {children}
    </ButtonTemplate>
  );
};

export default Button;
