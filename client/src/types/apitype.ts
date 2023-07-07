import { IScheduleListItem } from './type';

export interface MemberListT {
  courseContent: string;
  courseDday: string;
  courseId: number;
  courseLikeCount: number;
  courseThumbnail: string;
  courseTitle: string;
  courseUpdatedAt: string;
  courseViewCount: number;
  memberNickname: string;
  isPosted: boolean;
}

export interface PostReqT {
  courseId: number;
  postContent: string;
  tags: string[];
}

export type PostReadT = {
  courseData: {
    courseDday: string;
    courseTitle: string;
    courseContent: string;
    coureThumbnail: string;
  };
  destinationList: IScheduleListItem[];
};
