import { styled } from 'styled-components';
import { useState } from 'react';

import { TextareaT } from '../../../types/type';
import cssToken from '../../../styles/cssToken';
import Text from '../text/Text';

const Input = styled.input<TextareaT>`
  width: ${(props) => props.width || '50%'};
  height: ${(props) => props.height || '50%'};
  padding: ${cssToken.SPACING['gap-16']};
  border: solid 1px #dcdcdc;
  ::-webkit-input-placeholder {
    color: #c6c6c6;
  }
  &:focus {
    outline: none;
  }
  margin-bottom: 5px;
`;

const InputContainer = ({
  description,
  maxLength,
  styles,
  type,
}: {
  description: string;
  maxLength?: number;
  styles?: TextareaT;
  type?: 'title';
  // tag 입력 칸과 구분하기 위함
}) => {
  // Todo 작성하기 버튼 클릭 시 글자 수 확인 후 조건 만족 못하면 TexT 에러 박스 show 나중에 페이지에서 forward Ref 써야할듯
  const [isValidate] = useState(true);

  return (
    <>
      <Input
        placeholder={description}
        maxLength={maxLength || 524288}
        {...styles}
      />
      {type === 'title' && !isValidate && (
        <Text styles={{ color: cssToken.COLOR['red-900'] }}>
          글자 수를 만족하지 못했습니다.
        </Text>
      )}
    </>
  );
};

export default InputContainer;
