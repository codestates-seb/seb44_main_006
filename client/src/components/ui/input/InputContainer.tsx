import { styled } from 'styled-components';

import Search from '../../../assets/Search';
import cssToken from '../../../styles/cssToken';

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: ${(props) => props.width || '700px'};
  height: ${(props) => props.height};
  color: #424242;
  font-size: ${cssToken.TEXT_SIZE['text-16']};
  padding-top: ${cssToken.SPACING['gap-16']};
  padding-bottom: ${cssToken.SPACING['gap-16']};
  padding-left: 1.125rem;
  padding-right: 3.2rem;
  border: none;
  border-radius: ${cssToken.BORDER['rounded-input']};

  ::-webkit-input-placeholder {
    color: ${cssToken.COLOR['gray-700']};
  }
  &:focus {
    outline: none;
  }
`;

const InputContainer = () => {
  return (
    <InputWrapper>
      <Input type="text" placeholder="성심당" />
      <Search
        style={{ width: 25, height: 25, color: 'none' }}
        onClick={() => {}}
      />
    </InputWrapper>
  );
};

export default InputContainer;
