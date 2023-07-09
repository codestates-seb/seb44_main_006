import { CommentT, IScheduleListItem } from './type';

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

export type CommunityDetailT = {
  postId: string; // 고유값(게시글 식별자)
  memberNickname: string; // 작성자 닉네임
  memberEmail: string; // 작성자 이메일(작성자 식별자)
  memberImageUrl: string; // 작성자 프로필 이미지 URL
  courseTitle: string; // 게시글 제목(일정 제목과 동일)
  postContent: string; // 게시글 내용(커뮤니티 작성시에만 사용)
  tags: [string, string]; // 태그(키워드)
  courseViewCount: number; // 조회수
  courseLikeCount: number; // 받은 좋아요 수
  likeStatus: boolean; // 유저가 이 글에 좋아요했는지 안했는지
  bookmarkStatus: boolean; // 유저가 이 글에 즐겨찾기했는지 안했는지
  courseUpdatedAt: string; // 일정 수정한 날짜, ex) "2023-06-30T14:57:52"

  courseInfo: {
    courseId: number; // 고유값(일정 식별자)
    destiationList: IScheduleListItem[];
  };
  answerList: CommentT[];
};

export type CommunitySummaryT = {
  bookmarkStatus: boolean;
  courseId: number;
  courseLikeCount: number;
  courseThumbnail: string;
  courseTitle: string;
  courseUpdatedAt: string;
  courseViewCount: number;
  likeStatus: boolean;
  memberNickname: string;
  postContent: string;
  postId: number;
  tags: string[];
};

export type PageInfoT = {
  limit: number;
  page: number;
  totalElement: number;
  totalPages: number;
};

export type CommunityListT = {
  data: CommunitySummaryT[];
  pageInfo: PageInfoT;
};
