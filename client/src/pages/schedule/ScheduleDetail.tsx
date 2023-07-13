import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GetCourse } from '../../apis/api';
import { CommunityDetailT } from '../../types/apitype';
import { scheduleDetailActions } from '../../store/scheduleData-slice';
import { RootState } from '../../store';
import ScheduleMapDetail from '../../components/schedule/ScheduleMapDetail';

const ScheduleDetail = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams() as { courseId: string };

  useQuery({
    queryKey: ['resisterDetail'],
    queryFn: () => GetCourse({ courseId }),
    onSuccess: (data) => {
      dispatch(scheduleDetailActions.getCourseData(data?.courseData));
      dispatch(scheduleDetailActions.getDestinationList(data?.destinationList));
    },
  });

  const courseData = useSelector(
    (state: RootState) => state.scheduleDetail?.courseData
  );
  const destinationList = useSelector(
    (state: RootState) => state.scheduleDetail?.destinationList
  );

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
