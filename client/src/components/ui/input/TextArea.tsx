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
  margin-bottom: 5px;
  border: solid 1px #dcdcdc;
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
      minLength,
      maxLength,
      styles,
      disabled,
      isValidate,
    }: {
      description: string;
      minLength?: number;
      maxLength?: number;
      styles?: TextareaT;
      disabled?: boolean;
      isValidate?: boolean;
    },
    ref?: ForwardedRef<HTMLTextAreaElement>
  ) => {
    const errorMessage =
      minLength &&
      maxLength &&
      `${minLength}자에서 ${maxLength}자 사이로 입력해주세요.`;
    return (
      <>
        <Content
          ref={ref}
          {...styles}
          placeholder={description}
          minLength={minLength || 1}
          maxLength={maxLength || 5124288}
          required
          title={errorMessage || ''}
          wrap="vertical"
          disabled={disabled}
        />
        {!isValidate && (
          <Text styles={{ color: cssToken.COLOR['red-900'] }}>
            글자 수를 만족하지 못했습니다.
          </Text>
        )}
      </>
    );
  }
);

export default TextArea;
