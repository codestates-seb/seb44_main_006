import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { styled } from 'styled-components';

import { ChooseTag } from './DescriptionZip';

import { GapDiv, TagDiv } from '../../../styles/styles';
import InputContainer from '../../ui/input/InputContainer';
import cssToken from '../../../styles/cssToken';
import TagButton from '../../ui/button/TagButton';

const TagGapDiv = styled(GapDiv)`
  row-gap: ${cssToken.SPACING['gap-10']};
  @media screen and (max-width: 768px) {
    input {
      font-size: 0.7rem;
      padding: 0.5rem;
    }
  }
`;

const TagContainer = ({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [placeholder, setPlaceholder] = useState<string>(
    '태그 작성 후 엔터를 해주세요. 추가된 태그 클릭시 삭제 됩니다.'
  );
  const makeTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!inputRef.current) return;
      const { current } = inputRef;
      if (current && current?.value.trim().length > 0) {
        const newTag = current.value;
        if (!tags.find((tas) => tas === newTag)) {
          setTags((prev) => [...prev, newTag]);
        }
        current.value = '';
      }
    }
  };
  const removeTag = (selectTag: string | undefined) => {
    const filterTag = tags.filter((tag) => tag !== selectTag);
    setTags(filterTag);
  };

  useEffect(() => {
    if (tags.length >= 5) {
      inputRef.current!.readOnly = true;
      setPlaceholder('최대 태그 개수를 만족하였습니다.');
    } else {
      inputRef.current!.readOnly = false;
      setPlaceholder(
        '엔터를 누르면 태그가 작성되고 클릭 시 태그가 삭제 됩니다.'
      );
    }
  }, [tags]);

  return (
    <TagGapDiv>
      <ChooseTag />
      <>
        <InputContainer
          ref={inputRef}
          onkeypress={makeTag}
          styles={{
            width: '100%',
          }}
          description={placeholder}
        />
        <TagDiv>
          {tags.length > 0 &&
            tags.map((tag: string) => (
              <TagButton
                key={uuidv4()}
                tagname={tag}
                onClick={removeTag}
                width={cssToken.WIDTH['min-w-fit']}
                height="30px"
              >
                {tag}
              </TagButton>
            ))}
        </TagDiv>
      </>
    </TagGapDiv>
  );
};

export default TagContainer;
