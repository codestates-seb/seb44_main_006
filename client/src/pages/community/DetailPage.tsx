import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import InfoContainer from '../../components/community/detail/InfoContainer';
import UserInfoMy from '../../components/ui/UserInfoPfp';
import Title from '../../components/ui/text/Title';
import cssToken from '../../styles/cssToken';
import { FlexDiv, OutsideWrap } from '../../styles/styles';
import MapContainer from '../../components/community/MapContainer';
import TextArea from '../../components/ui/input/TextArea';
import SkyBlueButton from '../../components/ui/button/SkyBlueButton';
import PageMoveButton from '../../components/community/detail/PageMoveButton';
import CommentContainer from '../../components/community/detail/CommentContainer';
import ActionButtonContainer from '../../components/community/detail/ActionButtonContainer';
import TagContainer from '../../components/community/detail/TagContainer';
import { GetCommunityPost, PostComment } from '../../apis/api';
import manufactureDate from '../../utils/manufactureDate';
import getLoginStatus from '../../utils/getLoginStatus';
import { CommunityDetailT } from '../../types/apitype';

const HEADDiv = styled(FlexDiv)`
  justify-content: space-between;
`;

const UersDiv = styled(FlexDiv)`
  align-items: center;
  column-gap: ${cssToken.SPACING['gap-24']};
`;

const ContentDiv = styled(FlexDiv)`
  flex-direction: column;
  row-gap: ${cssToken.SPACING['gap-24']};
  width: 100%;
`;

const CommentBtn = styled(FlexDiv)`
  justify-content: flex-end;
`;

const DetailPage = () => {
  const isLogin = getLoginStatus();
  const [isValidate, setValidate] = useState(true);
  const { postId } = useParams() as { postId: string };
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { data: detailData } = useQuery({
    queryKey: ['communityDetail'],
    queryFn: () => GetCommunityPost({ postId }),
    refetchOnWindowFocus: false,
    select: (data: { data: CommunityDetailT }) => data.data,
  });

  console.log(detailData);

  const queryClient = useQueryClient();
  const mutation = useMutation(PostComment, {
    onSuccess: () => {
      if (textAreaRef.current) textAreaRef.current.value = '';
      return queryClient.invalidateQueries(['communityDetail']);
    },
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (textAreaRef.current && textAreaRef.current.value.trim().length > 0) {
      setValidate(true);
      mutation.mutate({ postId, answerContent: textAreaRef.current.value });
    } else {
      setValidate(false);
    }
  };
  return (
    <OutsideWrap>
      <Title styles={{ size: cssToken.TEXT_SIZE['text-40'] }}>
        나의 코스 자랑하기
      </Title>

      <HEADDiv>
        <UersDiv>
          {detailData && (
            <>
              <UserInfoMy src={detailData.memberImageUrl} />
              <InfoContainer
                writer={detailData.memberNickname}
                date={manufactureDate(detailData.courseUpdatedAt)}
              />
            </>
          )}
        </UersDiv>
        {detailData && postId && (
          <ActionButtonContainer
            bookmarkStatus={detailData.bookmarkStatus}
            likeStatus={detailData.likeStatus}
            LikeCount={detailData.courseLikeCount}
            isLogin={!!isLogin}
            postId={postId}
            courseId={detailData.courseInfo.courseId}
          />
        )}
      </HEADDiv>

      {detailData && (
        <MapContainer
          destinationList={detailData.courseInfo.destinationList}
          title={detailData.courseTitle}
        />
      )}

      <ContentDiv>
        {detailData && (
          <>
            <div dangerouslySetInnerHTML={{ __html: detailData.postContent }} />
            <TagContainer tagArr={detailData.tags} />
          </>
        )}
      </ContentDiv>

      <form onSubmit={onSubmit}>
        <TextArea
          ref={textAreaRef}
          description={
            isLogin
              ? '댓글을 작성해주세요.'
              : '로그인 후 댓글을 작성할 수 있습니다.'
          }
          disabled={!isLogin}
          styles={{ width: '100%' }}
          isValidate={isValidate}
        />
        <CommentBtn>
          <SkyBlueButton
            width="13.875rem"
            height="3.3125rem"
            borderRadius={cssToken.BORDER['rounded-md']}
            disabled={!isLogin}
          >
            작성하기
          </SkyBlueButton>
        </CommentBtn>
      </form>
      {detailData && <CommentContainer comments={detailData.answerList} />}
      <PageMoveButton />
    </OutsideWrap>
  );
};

export default DetailPage;
