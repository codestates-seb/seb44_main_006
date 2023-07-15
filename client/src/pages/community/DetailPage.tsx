import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { AxiosError } from 'axios';

import { mgpd } from './commonstyle';

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
import Content from '../../components/community/detail/Content';
import scrollToTop from '../../utils/scrollToTop';
import isEmpty from '../../utils/isEmpty';
import SkeletonMapContainer from '../../components/community/skeleton/SkeletonMapContainer';
import SkeletonUserContainer from '../../components/community/skeleton/SkeletonUserContainer';
import ActionButtonContainerRes from '../../components/community/detail/ActionButtonContainerRes';
import CopyButton from '../../components/ui/button/CopyButton';
import ShareKakaoButton from '../../components/ui/button/ShareKakaoButton';
import DeleteButton from '../../components/community/DeleteButton';
import useUserInfo from '../../querys/useUserInfo';

const DetailOutsideWrap = styled(OutsideWrap)`
  @media screen and (max-width: 768px) {
    ${mgpd};
    margin-bottom: 4.5rem;
    row-gap: ${cssToken.SPACING['gap-20']};
    h1:first-child {
      font-size: 1.25rem;
    }

    form > textarea {
      height: 6.25rem;
      font-size: ${cssToken.TEXT_SIZE['text-12']};
      margin-bottom: -0.25rem;
      border-bottom: none;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    form > p {
      font-size: 0.625rem;
    }
  }
`;

const HEADDiv = styled(FlexDiv)`
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    img {
      width: 3.25rem;
      height: 3.25rem;
    }
    p {
      font-size: ${cssToken.TEXT_SIZE['text-12']};
    }
  }
`;

const ResponseDiv = styled(FlexDiv)`
  justify-content: space-between;
`;

const UersDiv = styled(FlexDiv)`
  align-items: center;
  column-gap: ${cssToken.SPACING['gap-24']};

  @media screen and (max-width: 768px) {
    column-gap: ${cssToken.SPACING['gap-10']};

    div {
      width: fit-content;
      height: fit-content;
      img {
        width: 3.3125rem;
        height: 3.3125rem;
      }
    }
  }
`;

const ContentDiv = styled(FlexDiv)`
  flex-direction: column;
  row-gap: ${cssToken.SPACING['gap-24']};
  width: 100%;
`;

const CommentBtn = styled(FlexDiv)`
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
    .skyblue {
      width: 100%;
      border-radius: 0px;
      height: 2.0625rem;
    }
  }
`;

const SharBtnDiv = styled(FlexDiv)`
  column-gap: ${cssToken.SPACING['gap-10']};
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const DetailPage = () => {
  const isLogin = getLoginStatus();
  const navigate = useNavigate();
  const [isValidate, setValidate] = useState(true);
  const { postId } = useParams() as { postId: string };
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const {
    data: detailData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['communityDetail'],
    queryFn: () => GetCommunityPost({ postId }),
    refetchOnWindowFocus: false,
    select: (data: { data: CommunityDetailT }) => data.data,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation(PostComment, {
    onSuccess: () => {
      if (textAreaRef.current) textAreaRef.current.value = '';
      return queryClient.invalidateQueries(['communityDetail']);
    },
    onError: (err) => {
      const { response } = err as AxiosError;
      if (response) navigate(`/error/${response.status}`);
    },
  });
  const { userData } = useUserInfo();

  useEffect(() => {
    scrollToTop();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (textAreaRef.current && !isEmpty(textAreaRef.current.value)) {
      setValidate(true);
      mutation.mutate({ postId, answerContent: textAreaRef.current.value });
    } else {
      setValidate(false);
    }
  };

  const handleCommentChange = () => {
    if (textAreaRef.current && !isEmpty(textAreaRef.current.value))
      setValidate(true);
  };

  if (error) {
    const { response } = error as AxiosError;
    if (response) navigate(`/error/${response.status}`);
  }

  const postInfo = useMemo(() => {
    return {
      destinationList: detailData?.courseInfo.destinationList,
      postTitle: detailData?.courseTitle ?? '로딩 중',
    };
  }, [detailData?.courseInfo.destinationList, detailData?.courseTitle]);

  const userInfo = useMemo(() => {
    return {
      memberImageUrl: detailData?.memberImageUrl,
      memberNickname: detailData?.memberNickname ?? '로딩 중',
      courseUpdatedAt: manufactureDate(detailData?.courseUpdatedAt),
    };
  }, [
    detailData?.courseUpdatedAt,
    detailData?.memberImageUrl,
    detailData?.memberNickname,
  ]);

  const contentData = useMemo(() => {
    return {
      postContent: detailData?.postContent ?? '',
      tags: detailData?.tags ?? [],
    };
  }, [detailData?.postContent, detailData?.tags]);

  return (
    <DetailOutsideWrap>
      <ResponseDiv>
        <Title styles={{ size: cssToken.TEXT_SIZE['text-40'] }}>
          나의 코스 자랑하기
        </Title>
        {detailData && userData && (
          <SharBtnDiv>
            <CopyButton endpoint={`community/${detailData.postId}`} />
            <ShareKakaoButton endpoint={`community/${detailData.postId}`} />
            {userData && detailData.memberEmail === userData.memberEmail && (
              <DeleteButton postId={detailData.postId} />
            )}
          </SharBtnDiv>
        )}
      </ResponseDiv>
      <HEADDiv>
        <UersDiv>
          {isLoading && <SkeletonUserContainer />}
          {detailData && userInfo && (
            <>
              <UserInfoMy src={userInfo.memberImageUrl} />
              <InfoContainer
                writer={userInfo.memberNickname}
                date={userInfo.courseUpdatedAt}
              />
            </>
          )}
        </UersDiv>
        {detailData && postId && (
          <>
            <ActionButtonContainer
              memberEmail={detailData.memberEmail}
              bookmarkStatus={detailData.bookmarkStatus}
              likeStatus={detailData.likeStatus}
              LikeCount={detailData.courseLikeCount}
              isLogin={!!isLogin}
              postId={postId}
              courseId={detailData.courseInfo.courseId}
            />
            {userData && (
              <ActionButtonContainerRes
                userData={userData}
                memberEmail={detailData.memberEmail}
                bookmarkStatus={detailData.bookmarkStatus}
                likeStatus={detailData.likeStatus}
                LikeCount={detailData.courseLikeCount}
                isLogin={!!isLogin}
                courseId={detailData.courseInfo.courseId}
              />
            )}
          </>
        )}
      </HEADDiv>

      {/* //Todo Suspense로 아예 페이지 거는게 나을듯 ? */}
      {isLoading && <SkeletonMapContainer />}
      {detailData && postInfo.destinationList && (
        <MapContainer
          destinationList={postInfo.destinationList}
          title={postInfo.postTitle}
        />
      )}
      <ContentDiv>
        {detailData && contentData && (
          <>
            <Content postContent={contentData.postContent} />
            <TagContainer tagArr={contentData.tags} />
          </>
        )}
      </ContentDiv>
      <form onSubmit={onSubmit}>
        <TextArea
          onChange={handleCommentChange}
          maxLength={1000}
          ref={textAreaRef}
          description={
            isLogin
              ? '댓글을 작성해주세요. 최대(1000자)'
              : '로그인 후 댓글을 작성할 수 있습니다.'
          }
          disabled={!isLogin}
          styles={{ width: '100%', height: '12rem' }}
          isValidate={isValidate}
        />
        <CommentBtn>
          <SkyBlueButton
            width="13.875rem"
            height="3.3125rem"
            brradius={cssToken.BORDER['rounded-md']}
            disabled={!isLogin}
          >
            작성하기
          </SkyBlueButton>
        </CommentBtn>
      </form>
      {detailData && <CommentContainer comments={detailData.answerList} />}
      <PageMoveButton />
    </DetailOutsideWrap>
  );
};

export default memo(DetailPage);
