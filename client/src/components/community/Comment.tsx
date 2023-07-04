import { styled } from 'styled-components';

import Text from '../ui/text/Text';
import cssToken from '../../styles/cssToken';
import UserInfoMy from '../ui/UserInfoPfp';
import { FlexDiv } from '../../styles/styles';

const CommentWrapper = styled.div`
  display: flex;
  width: 80%;
  gap: ${cssToken.SPACING['gap-12']};
  border-bottom: 1px solid #dcdcdc;
  padding-top: ${cssToken.SPACING['gap-16']};
  padding-bottom: ${cssToken.SPACING['gap-16']};
`;

const FlexBetween = styled(FlexDiv)`
  justify-content: space-between;
  margin-bottom: ${cssToken.SPACING['gap-12']};
`;

const FlexAround = styled(FlexDiv)`
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
`;

const Comment = () => {
  return (
    <CommentWrapper>
      <div>
        <UserInfoMy
          styles={{ size: '4.25rem' }}
          src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
        />
      </div>
      <FlexAround>
        <FlexBetween>
          <Text
            styles={{
              size: cssToken.TEXT_SIZE['text-18'],
              weight: cssToken.FONT_WEIGHT.bold,
            }}
          >
            닉네임
          </Text>
          <FlexDiv>
            {/* 수정 삭제 버튼 */}
            <Text styles={{ color: ' #7B7B7B' }}>23.06.14</Text>
          </FlexDiv>
        </FlexBetween>
        <Text styles={{ size: cssToken.TEXT_SIZE['text-18'] }}>
          댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글
        </Text>
      </FlexAround>
    </CommentWrapper>
  );
};

export default Comment;
