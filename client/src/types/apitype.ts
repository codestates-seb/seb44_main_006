import { InfiniteQueryObserverResult } from '@tanstack/react-query';

import { IScheduleListItem } from './type';

export interface MemberCourseT {
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

export interface MemberBookmaredT {
  courseId: number;
  postId: number;
  courseTitle: string;
  postContent: string;
  courseThumbnail: string;
  tags: string[];
  memberNickname: string;
  courseLikeCount: number;
  courseViewCount: number;
  likeStatus: boolean;
  courseUpdatedAt: string;
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
    courseThumbnail: string;
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
    destinationList: IScheduleListItem[];
  };
  answerList: CommentT[];
};

export type CommunitySummaryT = {
  answerCount: number;
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
  postCreatedAt: string;
  postId: number;
  tags: string[];
  memberEmail: string;
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

export type InfiniteScrollT = {
  communityListData: CommunitySummaryT[];
  current_page: number;
  isLast: boolean;
};

export type FetchNextPageT = () => Promise<
  InfiniteQueryObserverResult<
    {
      communityListData: CommunitySummaryT[];
      current_page: number;
      isLast: boolean;
    },
    unknown
  >
>;

export interface CommentT {
  answerId?: number; // 고유값(댓글 식별자)
  answererEmail?: string; // 고유값(댓글 작성자 이메일)
  answererNickname: string; // 댓글 작성자 닉네임
  answerContent: string; // 댓글 내용
  answererImageUrl: string; // 댓글 작성자 이미지 URL
  answerUpdatedAt: string; // 댓글 수정한 날짜, ex) "2023-06-30 Fri"
}

// 마이 페이지
export type MypCourseSummaryT = {
  courseContent?: string;
  courseDday?: string;
  courseId?: number;
  courseLikeCount?: number;
  courseThumbnail?: string;
  courseTitle?: string;
  courseUpdatedAt?: string;
  courseViewCount?: number;
  isPosted?: boolean;
  memberNickname?: string;
};

export type MyBookMarkSummaryT = {
  answerCount?: number;
  bookmarkId?: number;
  courseId?: number;
  courseLikeCount?: number;
  courseThumbnail?: string;
  courseTitle?: string;
  courseUpdatedAt?: string;
  courseViewCount?: number;
  likeStatus?: boolean;
  memberNickname?: string;
  postContent?: string;
  postCreatedAt?: string;
  postId?: number;
  tags?: string[];
};

export type MypSummaryT = {
  memberCourseList: MypCourseSummaryT[];
  memberBookmarkedList: MyBookMarkSummaryT[];
};

// 일정 상세 페이지
export type DestinationListT = {
  categoryGroupCode?: string;
  categoryGroupName?: string;
  id?: string;
  phone?: string;
  placeName?: string;
  placeUrl?: string;
  roadAddressName?: string;
  x?: string;
  y?: string;
};

export type CourseDatassT = {
  courseContent?: string;
  courseDday?: string;
  courseThumbnail?: string;
  courseTitle?: string;
};

// 회원 정보 조회
export type UserInfoT = {
  memberId: number; // 고유값(회원 식별자)
  memberEmail: string; // 고유값(회원 이메일)
  memberNickname: string; // 회원 닉네임
  memberImageUrl: string; // 회원 이미지 URL
  myCourseCount: number; // 내가 작성한 코스의 개수
  myBookmarkCount: number; // 내가 즐겨찾기한 커뮤니티 글의 개수
  isAdmin: boolean; // admin 권한이 있으면 true, 아니면 false
};
