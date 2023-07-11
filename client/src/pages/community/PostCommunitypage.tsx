import { styled } from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import cssToken from '../../styles/cssToken';
import { GapDiv, OutsideWrap } from '../../styles/styles';
import PageMoveBtnDiv from '../../components/community/PageMoveButton';
import {
  ExampleDescription,
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

const QuillDiv = styled(GapDiv)`
  margin-bottom: '0.1875rem';
`;

const ErrorContainer = styled(GapDiv)`
  margin-bottom: ${cssToken.SPACING['gap-24']};
`;

const PostCommunitypage = () => {
  const scheduleid = useLocation().state as string;
  const quillRef = useRef<ReactQuill>(null);
  const gotoBack = useMovePage('/community/select', null, true);
  const navigate = useNavigate();
  const modalIsOpen = useSelector((state: RootState) => state.overlay.isOpen);
  const toggleModal = useToggleModal();
  const [tags, setTags] = useState<string[] | []>([]);
  const [isValidate, setIsValidate] = useState<boolean>(true);

  const { data: courses } = useQuery({
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
      if (response) navigate(`/error/${response.status}`);
    },
  });
  const isEditorEmpty = () => {
    const inputString = String(quillRef.current?.value);
    const sanitizedValue: string = removeTag(inputString).trim();
    return sanitizedValue.length === 0;
  };
  const HandleBack = () => {
    if (isEditorEmpty()) {
      gotoBack();
      return;
    }
    toggleModal();
  };
  const HandleNext = () => {
    if (!isEditorEmpty()) {
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
    if (!isEditorEmpty()) {
      setIsValidate(true);
    }
  };

  return (
    <>
      <OutsideWrap>
        <MyCourseBoast />
        <GapDiv>
          <ExampleDescription />
          {courses && (
            <MapContainer
              title={courses.courseData.courseTitle}
              destinationList={courses.destinationList}
            />
          )}
        </GapDiv>

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
            <Text styles={{ color: cssToken.COLOR['red-900'] }}>
              글자 수를 만족하지 못했습니다.
            </Text>
          )}
        </ErrorContainer>

        <TagContainer tags={tags} setTags={setTags} />
        <Warning />
        <PageMoveBtnDiv
          grayCallback={HandleBack}
          skyblueCallback={HandleNext}
        />
      </OutsideWrap>
      {modalIsOpen && (
        <Modal
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
