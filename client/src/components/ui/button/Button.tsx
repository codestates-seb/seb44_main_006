import { styled } from 'styled-components';

import { Props } from '../../../types/type';

interface IButtonStyle {
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  color?: string;
  backgroundColor?: string;
  boxShadow?: string;
  border?: string;
  borderRadius?: string;
}

// background-color, color, shadow, border, border-radius
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
`;

const Button = ({
  children,
  styles,
}: {
  children: Props['children'];
  styles: IButtonStyle;
}) => {
  return <ButtonTemplate {...styles}>{children}</ButtonTemplate>;
};

export default Button;
