import { styled } from 'styled-components';
import { forwardRef, ForwardedRef } from 'react';

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
  width?: string;
  height?: string;
  fontsize?: string;
  pt?: string;
  pb?: string;
};

type SearchT = {
  iconWidth?: number;
  iconHeight?: number;
  styles?: StylesT;
  callback?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const SearchContainer = forwardRef(
  (
    { iconWidth, iconHeight, styles, callback }: SearchT,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputWrapper>
        <Input
          ref={ref}
          type="text"
          placeholder="검색어를 입력해주세요."
          {...styles}
        />
        <Search
          style={{
            iconWidth: iconWidth || 25,
            iconHeight: iconHeight || 25,
            color: 'none',
          }}
          onClick={callback}
        />
      </InputWrapper>
    );
  }
);

export default SearchContainer;
