import { styled } from 'styled-components';

import Text from '../ui/text/Text';
import cssToken from '../../styles/cssToken';
import UserInfoMy from '../ui/UserInfoPfp';
import { FlexDiv } from '../../styles/styles';
import { CommentT } from '../../types/type';

const CommentWrapper = styled.div`
  display: flex;
  width: 100%;
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

// Todo 수정 삭제버튼
const Comment = ({
  answererImageUrl: src,
  answererNickname: nickName,
  answerUpdatedAt: date,
  answerContent: content,
  answererEmail: email,
}: CommentT) => {
  return (
    <CommentWrapper>
      <div>
        <UserInfoMy styles={{ size: '4.25rem' }} src={src} />
      </div>
      <FlexAround>
        <FlexBetween>
          <Text
            styles={{
              size: cssToken.TEXT_SIZE['text-18'],
              weight: cssToken.FONT_WEIGHT.bold,
            }}
          >
            {nickName}
          </Text>
          <FlexDiv>
            {/* 수정 삭제 버튼 */}
            <Text
              styles={{
                color: ' #7B7B7B',
                weight: cssToken.FONT_WEIGHT.medium,
              }}
            >
              {date}
            </Text>
          </FlexDiv>
        </FlexBetween>
        <Text
          styles={{
            size: cssToken.TEXT_SIZE['text-18'],
            weight: cssToken.FONT_WEIGHT.medium,
          }}
        >
          {content}
        </Text>
      </FlexAround>
    </CommentWrapper>
  );
};

export default Comment;
