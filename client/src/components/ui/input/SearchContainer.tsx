import { styled } from 'styled-components';
import { forwardRef, ForwardedRef, memo } from 'react';

import cssToken from '../../../styles/cssToken';
import Search from '../../../assets/icons/Search';

const InputWrapper = styled.div<StylesT>`
  position: relative;
  width: ${(props) => props.width || '31.25rem'};
`;

const Input = styled.input<StylesT>`
  display: inline-block;
  background-color: ${cssToken.COLOR['gray-300']};
  width: 100%;
  height: ${(props) => props.height};
  color: #424242;
  font-size: ${(props) => props.fontsize || cssToken.TEXT_SIZE['text-16']};
  padding-top: ${(props) => props.pt || cssToken.SPACING['gap-16']};
  padding-bottom: ${(props) => props.pb || cssToken.SPACING['gap-16']};
  padding-left: 1.125rem;
  padding-right: 3.5rem;
  border: 1px solid ${cssToken.COLOR['gray-600']};
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
  searchClick: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => void;
};

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1rem;
  cursor: pointer;
`;

const SearchContainer = forwardRef(
  (
    { iconWidth, iconHeight, styles, searchClick }: SearchT,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputWrapper width={styles?.width}>
        <Input
          ref={ref}
          type="text"
          placeholder="검색어를 입력해주세요."
          {...styles}
        />
        <Button type="button" onClick={searchClick}>
          <Search
            style={{
              iconWidth: iconWidth || 25,
              iconHeight: iconHeight || 25,
              color: 'none',
            }}
          />
        </Button>
      </InputWrapper>
    );
  }
);

export default memo(SearchContainer);
