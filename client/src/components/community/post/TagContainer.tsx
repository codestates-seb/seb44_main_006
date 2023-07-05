import { styled } from 'styled-components';

import { ChooseTag } from './HEADzip';

import { FlexDiv, GapDiv } from '../../../styles/styles';
import InputContainer from '../../ui/input/InputContainer';
import TagButton from '../../ui/button/TagButton';

const TagDiv = styled(FlexDiv)`
  column-gap: 0.5rem;
`;
const TagContainer = () => {
  const Tagarray = ['성심당', '성심당', '성심당', '성심당'];
  const makeTag = () => {};
  return (
    <GapDiv>
      <ChooseTag />
      <>
        <InputContainer
          onChange={makeTag}
          styles={{
            width: '100%',
          }}
          description="태그 작성 후 엔터를 해주세요. 추가된 태그 클릭시 삭제 됩니다."
        />
        <TagDiv>
          {Tagarray.map((tag) => (
            <TagButton width="71px" height="30px">
              {tag}
            </TagButton>
          ))}
        </TagDiv>
      </>
    </GapDiv>
  );
};

export default TagContainer;
