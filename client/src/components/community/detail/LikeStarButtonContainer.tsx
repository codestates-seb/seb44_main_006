import { styled } from 'styled-components';

import { FlexDiv } from '../../../styles/styles';
import cssToken from '../../../styles/cssToken';
import StarButton from '../../ui/button/StarButton';
import LikeButton from '../../ui/button/LikeButton';
import Text from '../../ui/text/Text';

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
  column-gap: 0.25rem;
`;

const LikeStarButtonContainer = ({
  LikeCount,
  isCheck,
  isLogin,
}: {
  LikeCount: number;
  isCheck: boolean;
  isLogin: boolean;
}) => {
  return (
    <BtnDiv>
      {/* Todo 작성자와 관리자에게만 보이도록 */}
      {/* Todo 클릭 시 확인 모달 띄우기 */}
      {/* Todo 삭제버튼 */}
      {isLogin && (
        <StarButton width="3.75rem" height="3.75rem" isActive={isCheck} />
      )}
      <StarDiv>
        {isLogin && (
          <>
            <LikeButton />
            {LikeCount}
          </>
        )}
        {!isLogin && (
          <>
            <Text styles={{ weight: cssToken.FONT_WEIGHT.medium }}>좋아요</Text>
            {LikeCount}
          </>
        )}
      </StarDiv>
    </BtnDiv>
  );
};

export default LikeStarButtonContainer;
