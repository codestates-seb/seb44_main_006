import { styled } from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

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

const QuillDiv = styled(GapDiv)`
  margin-bottom: ${cssToken.SPACING['gap-50']};
`;

const PostCommunitypage = () => {
  const scheduleid = useLocation().state as string;
  const quillRef = useRef<ReactQuill>(null);
  const gotoBack = useMovePage('/community/select');
  const gotoNext = useMovePage('/community/post/id');
  const modalIsOpen = useSelector((state: RootState) => state.overlay.isOpen);
  const toggleModal = useToggleModal();
  const [tags, setTags] = useState<string[] | []>([]);

  const { data: courses } = useQuery({
    queryKey: ['course'],
    queryFn: () => GetCourse({ courseId: scheduleid }),
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });

  const mutation = useMutation(PostCommunity, {
    onSuccess(data, variables, context) {
      console.log(data, variables, context);
    },
  });

  const isEditorEmpty = () => {
    const inputString = String(quillRef.current?.value);
    const sanitizedValue: string = inputString
      .replace(/<\/?[^>]+(>|$)/g, '')
      .trim();
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
      // Todo post 잘될 경우 해당 커뮤니티 게시글 페이지로 이동
      // gotoNext();
      // return;
    }
    quillRef.current?.focus();
  };
  const goToback = () => {
    gotoBack();
    toggleModal();
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
          <ReactQuill ref={quillRef} style={{ height: '200px' }} />
        </QuillDiv>
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
          <ModalChildren toggleModal={toggleModal} gotoBack={goToback} />
        </Modal>
      )}
    </>
  );
};

export default PostCommunitypage;
