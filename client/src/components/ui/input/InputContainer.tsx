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
        {type === 'title' && !isValidate && (
          <Text styles={{ color: cssToken.COLOR['red-900'] }}>
            글자 수를 만족하지 못했습니다.
          </Text>
        )}
      </>
    );
  }
);

export default InputContainer;
