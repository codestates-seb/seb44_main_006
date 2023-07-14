import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';

import { GetCourse } from '../../apis/api';
import { PostReadT } from '../../types/apitype';
import { scheduleDetailActions } from '../../store/scheduleData-slice';
import { RootState } from '../../store';
import ScheduleMapDetail from '../../components/schedule/ScheduleMapDetail';

const ScheduleDetail = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams() as { courseId: string };
  const navigate = useNavigate();

  useQuery({
    queryKey: ['resisterDetail'],
    queryFn: () => GetCourse({ courseId }),
    onSuccess: (data: { data: PostReadT }) => {
      dispatch(scheduleDetailActions.getCourseData(data.data.courseData));
      dispatch(
        scheduleDetailActions.getDestinationList(data.data.destinationList)
      );
    },
    onError: (error) => {
      const { response } = error as AxiosError;
      if (response) navigate(`/error/${response.status}`);
    },
  });

  const courseData = useSelector(
    (state: RootState) => state.scheduleDetail?.courseData
  );
  const destinationList = useSelector(
    (state: RootState) => state.scheduleDetail?.destinationList
  );

  return (
    <article>
      {courseData && destinationList && (
        <ScheduleMapDetail
          destinationList={destinationList}
          title={courseData.courseTitle || ''}
          text={courseData.courseContent || ''}
          courseDday={courseData.courseDday || ''}
        />
      )}
    </article>
  );
};

export default memo(ScheduleDetail);
