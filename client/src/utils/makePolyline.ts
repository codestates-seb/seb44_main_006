import { IScheduleListItem } from '../types/type';

const makePolyline = (courses: IScheduleListItem[]) => {
  const positions = courses.map((course: IScheduleListItem) => {
    return { lat: course.y, lng: course.x };
  });
  return positions;
};

export default makePolyline;
