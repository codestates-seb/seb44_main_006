import cssToken from '../../../styles/cssToken';
import { TagDiv } from '../../../styles/styles';
import TagButton from '../../ui/button/TagButton';

const TagContainer = ({ tagArr }: { tagArr: string[] }) => {
  return (
    <TagDiv>
      {tagArr.map((tag) => (
        <TagButton width={cssToken.WIDTH['min-w-fit']}>{tag}</TagButton>
      ))}
    </TagDiv>
  );
};

export default TagContainer;
