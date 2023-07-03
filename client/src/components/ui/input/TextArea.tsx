import { styled } from 'styled-components';
import { useState } from 'react';

import cssToken from '../../../styles/cssToken';
import Text from '../text/Text';
import { TextareaT } from '../../../types/type';

const Content = styled.textarea<TextareaT>`
  width: ${(props) => props.width || '50%'};
  height: ${(props) => props.height || '230px'};
  padding: ${cssToken.SPACING['gap-12']};
  border: solid 1px #dcdcdc;
  resize: none;
  ::-webkit-input-placeholder {
    color: #aaaaaa;
  }
`;

const TextArea = ({
  description,
  maxLength,
  styles,
}: {
  description: string;
  maxLength?: number;
  styles?: TextareaT;
}) => {
  // Todo 작성하기 버튼 클릭 시 글자 수 확인 후 조건 만족 못하면 TexT 에러 박스 show 나중에 페이지에서 forward Ref 써야할듯
  const [isValidate, setIsValidate] = useState<boolean>(true);
  return (
    <>
      <Content
        {...styles}
        placeholder={description}
        maxLength={maxLength || 5124288}
        wrap="vertical"
      />
      {!isValidate && (
        <Text styles={{ color: cssToken.COLOR['red-900'] }}>
          글자 수를 만족하지 못했습니다.
        </Text>
      )}
    </>
  );
};

export default TextArea;
