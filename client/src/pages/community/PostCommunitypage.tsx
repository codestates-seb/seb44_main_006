import { styled } from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { mgpd } from './commonstyle';

import cssToken from '../../styles/cssToken';
import { FlexDiv, GapDiv, OutsideWrap } from '../../styles/styles';
import PageMoveBtnDiv from '../../components/community/PageMoveButton';
import {
  MyCourseBoast,
  WritePost,
} from '../../components/community/post/DescriptionZip';
import Warning from '../../components/community/post/Warning';
import TagContainer from '../../components/community/post/TagContainer';
import useMovePage from '../../hooks/useMovePage';
import MapContainer from '../../components/community/MapContainer';
import Modal from '../../components/ui/modal/Modal';
import { RootState } from '../../store';
import ModalChildren from '../../components/community/post/ModalChildren';
import useToggleModal from '../../hooks/useToggleModal';
import { GetCourse, PostCommunity } from '../../apis/api';
import { PostReadT } from '../../types/apitype';
import removeTag from '../../utils/removeTag';
import Text from '../../components/ui/text/Text';
import scrollToTop from '../../utils/scrollToTop';
import isEmpty from '../../utils/isEmpty';
import SkeletonMapContainer from '../../components/community/skeleton/SkeletonMapContainer';
import useValidEnter from '../../hooks/useValidEnter';
import LocationInfoWrapper from '../../components/community/detail/LocationInfoWrapper';

const PostOutsideWrap = styled(OutsideWrap)`
  @media screen and (max-width: 768px) {
    ${mgpd}
    margin-bottom: 4.5rem;
    row-gap: ${cssToken.SPACING['gap-20']};
    h3 {
      font-size: 1rem;
    }

    p {
      font-size: 0.8125rem;
      line-height: 1rem;
    }
  }
`;

const QuillDiv = styled(GapDiv)`
  margin-bottom: 0.1875rem;
  .ql-toolbar {
    height: 2.625rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;

    .ql-formats {
      display: flex;
      flex-direction: row;
    }
  }
`;

const MapInfoDiv = styled(FlexDiv)`
  width: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const MapGap = styled(GapDiv)`
  width: 100%;
`;

const ErrorContainer = styled(GapDiv)`
  margin-bottom: ${cssToken.SPACING['gap-12']};

  @media screen and (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const PostCommunitypage = () => {
  const checkValidEnter = useValidEnter();
  const scheduleid = useLocation().state as string;
  const quillRef = useRef<ReactQuill>(null);
  const gotoBack = useMovePage('/community/select', null, true);
  const navigate = useNavigate();
  const modalIsOpen = useSelector((state: RootState) => state.overlay.isOpen);
  const toggleModal = useToggleModal();
  const [tags, setTags] = useState<string[] | []>([]);
  const [isValidate, setIsValidate] = useState<boolean>(true);

  const { data: courses, isLoading } = useQuery({
    queryKey: ['course'],
    queryFn: () => GetCourse({ courseId: scheduleid }),
    refetchOnWindowFocus: false,
    select: (data: { data: PostReadT }) => data.data,
  });

  const mutation = useMutation(PostCommunity, {
    onSuccess(data) {
      navigate(`/community/${data.headers.location as string}`, {
        replace: true,
      });
    },
    onError: (error) => {
      const { response } = error as AxiosError;
      if (response) {
        navigate('/error', {
          state: {
            status: response.status,
            errormsg: response.statusText,
          },
        });
      }
    },
  });

  useEffect(() => {
    checkValidEnter();
    scrollToTop();
  }, [checkValidEnter]);

  const HandleBack = () => {
    if (isEmpty(removeTag(String(quillRef.current?.value)))) {
      gotoBack();
      return;
    }
    toggleModal();
  };

  const HandleNext = () => {
    if (!isEmpty(removeTag(String(quillRef.current?.value)))) {
      mutation.mutate({
        courseId: Number(scheduleid),
        postContent: String(quillRef.current!.value),
        tags,
      });
      return;
    }
    quillRef.current?.focus();
    setIsValidate(false);
  };

  const goToback = () => {
    gotoBack();
    toggleModal();
  };

  const HandleQuillChange = () => {
    if (!isEmpty(removeTag(String(quillRef.current?.value)))) {
      setIsValidate(true);
    }
  };

  return (
    <>
      <PostOutsideWrap>
        <MyCourseBoast />
        <MapInfoDiv>
          {courses && (
            <LocationInfoWrapper
              title={courses.courseData.courseTitle}
              destinationList={courses.destinationList}
            />
          )}
          <MapGap>
            {isLoading && <SkeletonMapContainer />}
            {courses && (
              <MapContainer destinationList={courses.destinationList} />
            )}
          </MapGap>
        </MapInfoDiv>
        <>
          <QuillDiv>
            <WritePost />
            <ReactQuill
              onChange={HandleQuillChange}
              ref={quillRef}
              style={{ height: '200px' }}
            />
          </QuillDiv>
          <ErrorContainer>
            {!isValidate && (
              <Text
                styles={{
                  color: cssToken.COLOR['red-900'],
                  size: '0.9rem',
                  weight: 500,
                }}
              >
                글자 수를 만족하지 못했습니다.
              </Text>
            )}
          </ErrorContainer>
        </>

        <TagContainer tags={tags} setTags={setTags} />
        <Warning />
        <PageMoveBtnDiv
          grayCallback={HandleBack}
          skyblueCallback={HandleNext}
        />
      </PostOutsideWrap>
      {modalIsOpen && (
        <Modal
          className={['modal', 'modalContainer']}
          backdropCallback={toggleModal}
          handleCloseBtn={toggleModal}
          styles={{
            width: '47.0625rem',
            height: '28.375rem',
          }}
        >
          <ModalChildren
            leftBtnCallback={toggleModal}
            rightBtnCallback={goToback}
            content="작성하신 내용이 사라집니다."
          />
        </Modal>
      )}
    </>
  );
};

export default PostCommunitypage;
