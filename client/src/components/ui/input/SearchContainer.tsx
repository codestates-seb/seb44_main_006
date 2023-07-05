import { styled } from 'styled-components';
import { useRef } from 'react';

import Search from '../../../assets/Search';
import cssToken from '../../../styles/cssToken';

const InputWrapper = styled.div`
  position: relative;
  width: ${cssToken.WIDTH['min-w-fit']};
`;

const Input = styled.input<StylesT>`
  background-color: ${cssToken.COLOR['gray-300']};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: #424242;
  font-size: ${(props) => props.fontsize || cssToken.TEXT_SIZE['text-16']};
  padding-top: ${(props) => props.pt || cssToken.SPACING['gap-16']};
  padding-bottom: ${(props) => props.pb || cssToken.SPACING['gap-16']};
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

type StylesT = {
  width: string;
  height: string;
  fontsize?: string;
  pt?: string;
  pb?: string;
};

type SearchT = {
  iconWidth?: number;
  iconHeight?: number;
  styles: StylesT;
};

const SearchContainer = ({ iconWidth, iconHeight, styles }: SearchT) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const PostSearch = () => {
    if (inputRef.current) {
      if (inputRef.current.value.trim().length) {
        // Todo 입력값이 제대로 있는 경우 POST하도록
      }
    }
  };
  return (
    <InputWrapper>
      <Input ref={inputRef} type="text" placeholder="성심당" {...styles} />
      <Search
        style={{
          iconWidth: iconWidth || 25,
          iconHeight: iconHeight || 25,
          color: 'none',
        }}
        onClick={PostSearch}
      />
    </InputWrapper>
  );
};

export default SearchContainer;
