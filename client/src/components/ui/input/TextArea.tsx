import { styled } from 'styled-components';
import { ForwardedRef, forwardRef } from 'react';

import cssToken from '../../../styles/cssToken';
import Text from '../text/Text';
import { TextareaT } from '../../../types/type';

const Content = styled.textarea<TextareaT>`
  width: ${(props) => props.width || '50%'};
  height: ${(props) => props.height || '230px'};
  padding: ${cssToken.SPACING['gap-12']};
  font-size: ${(props) => props.size || '16px'};
  margin-bottom: ${(props) => (props.type ? 0 : '0.3125rem')};
  border: solid 1px ${cssToken.COLOR['gray-600']};
  resize: none;
  ::-webkit-input-placeholder {
    color: #c6c6c6;
  }
  &:focus {
    outline: none;
  }
`;

const TextArea = forwardRef(
  (
    {
      description,
      defaultValue,
      minLength,
      maxLength,
      styles,
      disabled,
      isValidate,
      onChange,
    }: {
      description: string;
      defaultValue?: string;
      minLength?: number;
      maxLength?: number;
      styles?: TextareaT;
      disabled?: boolean;
      isValidate?: boolean;
      onChange?: () => void;
    },
    ref?: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <>
        <Content
          onChange={onChange}
          ref={ref}
          defaultValue={defaultValue}
          {...styles}
          placeholder={description}
          minLength={minLength || 1}
          maxLength={maxLength || 5124288}
          wrap="vertical"
          disabled={disabled}
        />
        {(!isValidate && defaultValue?.length! <= 1) && (
          <Text
            styles={{
              color: cssToken.COLOR['red-900'],
              size: '0.9rem',
              weight: 500,
            }}
          >
            글자 수를 만족하지 못했습니다.
          </Text>
        )}
      </>
    );
  }
);

export default TextArea;
