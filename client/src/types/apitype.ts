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
}

export interface PostReqT {
  courseId: number;
  postContent: string;
  tags: string[];
}
