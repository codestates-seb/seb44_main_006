import { styled } from 'styled-components';

import { FlexDiv } from '../../../styles/styles';
import cssToken from '../../../styles/cssToken';
import StarButton from '../../ui/button/StarButton';
import LikeButton from '../../ui/button/LikeButton';

const BtnDiv = styled(FlexDiv)`
  column-gap: ${cssToken.SPACING['gap-12']};
  align-items: center;
`;

const StarDiv = styled(FlexDiv)`
  height: 70%;
  background-color: ${cssToken.COLOR['gray-300']};
  padding-left: ${cssToken.SPACING['gap-12']};
  padding-right: ${cssToken.SPACING['gap-12']};
  border-radius: ${cssToken.BORDER['rounded-md']};
  align-items: center;
`;

const LikeStarButtonContainer = ({
  LikeCount,
  isCheck,
}: {
  LikeCount: number;
  isCheck: boolean;
}) => {
  return (
    <BtnDiv>
      {/* Todo 작성자와 관리자에게만 보이도록 */}
      {/* Todo 클릭 시 확인 모달 띄우기 */}
      {/* Todo 삭제버튼 */}
      <StarButton width="3.75rem" height="3.75rem" isActive={isCheck} />
      <StarDiv>
        <LikeButton />
        {LikeCount}
      </StarDiv>
    </BtnDiv>
  );
};

export default LikeStarButtonContainer;
