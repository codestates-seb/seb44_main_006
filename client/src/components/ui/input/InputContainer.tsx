import { styled } from 'styled-components';
import { ChangeEvent, ForwardedRef, KeyboardEvent, forwardRef } from 'react';

import { TextareaT } from '../../../types/type';
import cssToken from '../../../styles/cssToken';
import Text from '../text/Text';

const Input = styled.input<TextareaT>`
  width: ${(props) => props.width || '50%'};
  height: ${(props) => props.height || '50%'};
  font-size: ${(props) => props.size || '16px'};
  padding: ${cssToken.SPACING['gap-16']};
  margin-bottom: 5px;
  border: solid 1px ${cssToken.COLOR['gray-600']};
  ::-webkit-input-placeholder {
    color: #c6c6c6;
  }
  &:focus {
    outline: none;
  }
`;

const InputContainer = forwardRef(
  (
    {
      description,
      minLength,
      maxLength,
      styles,
      type,
      textType,
      text,
      isValidate,
      onkeypress,
      defaultValue,
      onChange,
    }: {
      description?: string;
      minLength?: number;
      maxLength?: number;
      isValidate?: boolean;
      styles?: TextareaT;
      type?: 'title';
      textType?: string;
      text?: string;
      defaultValue?: string;
      // tag 입력 칸과 구분하기 위함
      onkeypress?: (e: KeyboardEvent<HTMLInputElement>) => void;
      onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    },
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <Input
          ref={ref}
          onKeyUp={onkeypress}
          placeholder={description}
          minLength={minLength || 1}
          maxLength={maxLength || 524288}
          {...styles}
          defaultValue={defaultValue}
          onChange={onChange}
        />
        {!textType && type === 'title' && (!isValidate && defaultValue?.length! <= 1) && (
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

        {textType === 'nickName' && !isValidate && (
          <Text
            styles={{
              color: cssToken.COLOR['red-900'],
              size: '0.9rem',
              weight: 500,
            }}
          >
            {text}
          </Text>
        )}
      </>
    );
  }
);

export default InputContainer;
