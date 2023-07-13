import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { memo, useMemo, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';

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
import { GetCommunityPost, PostComment, GetCourse } from '../../apis/api';
import manufactureDate from '../../utils/manufactureDate';
import getLoginStatus from '../../utils/getLoginStatus';
import { CommunityDetailT } from '../../types/apitype';
import { scheduleDetailActions } from '../../store/scheduleData-slice';
import { RootState } from '../../store';
import ScheduleMapDetail from '../../components/schedule/ScheduleMapDetail';


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

const ScheduleDetail = () => {
  const isLogin = getLoginStatus();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isValidate, setValidate] = useState(true);
  const { courseId } = useParams() as { courseId: string };

  useQuery({
    queryKey: ['resisterDetail'],
    queryFn: () => GetCourse({ courseId }),
    onSuccess: (data) => {
      dispatch(scheduleDetailActions.getCourseData(data?.courseData));
      dispatch(scheduleDetailActions.getDestinationList(data?.destinationList));
      console.log(data);
    },
  });

  const courseData = useSelector((state: RootState) => state.scheduleDetail?.courseData);
  const destinationList = useSelector((state: RootState) => state.scheduleDetail?.destinationList);


  console.log('courseData', courseData);
  console.log('destinationList', destinationList);

  // const userInfo = useMemo(() => {
  //   return {
  //     memberImageUrl: resisterData?.memberImageUrl,
  //     memberNickname: resisterData?.memberNickname ?? '로딩 중',
  //     courseUpdatedAt: manufactureDate(resisterData?.courseUpdatedAt),
  //   };
  // }, [
  //   resisterData?.courseUpdatedAt,
  //   resisterData?.memberImageUrl,
  //   resisterData?.memberNickname,
  // ]);

  return (
    <>
      {destinationList && (
        <ScheduleMapDetail
          destinationList={destinationList}
          title={courseData.courseTitle}
          text={courseData.courseContent}
          courseDday={courseData.courseDday}
        />
      )}
    </>
  );
};

export default memo(ScheduleDetail);
