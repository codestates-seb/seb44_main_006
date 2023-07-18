import axios, {
  AxiosError,
  AxiosHeaderValue,
  AxiosHeaders,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { CommunityListT, PostReqT } from '../types/apitype';

const PROXY = window.location.hostname === 'localhost' ? '' : '';

export const instance = axios.create({
  baseURL: PROXY,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const newConfig = { ...config };
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  newConfig.headers.Authorization = accessToken;
  newConfig.headers.RefreshToken = refreshToken;
  return newConfig;
});

// TODO:refrashtoken 응답요청 하기
//* 기존 API 호출하다 444 에러코드 응답 시 reissue 로 헤더 그대로 호출시 재발급
//* reissue 호출에 대한 응답까지도 444 일 경우 refreshToken도 만료된 상황이므로 다시 로그인이 필요
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalConfig = error.config;
    const status = error.response?.status;
    if (status === 410) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios({
          url: `${PROXY}/api/auth/reissue`,
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
            RefreshToken: refreshToken,
          },
        });
        if (response) {
          const newAccessToken = response.headers.authorization as string;
          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('isLogin', JSON.stringify(true));
          if (originalConfig && originalConfig.headers) {
            originalConfig.headers = {
              ...originalConfig.headers,
              Authorization: newAccessToken,
            } as AxiosRequestHeaders;
            return await instance(originalConfig);
          }
        }
      } catch (err) {
        localStorage.clear();
        throw err;
      }
    }
    return Promise.reject(error);
  }
);

export const GetUserInfo = async () => instance.get(`/api/auth/members`);

export const RemoveUserInfo = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return instance.post('/api/auth/logout', {
    Authorization: accessToken,
    RefreshToken: refreshToken,
  });
};

export const DeleteAccount = async () => instance.delete('/api/members');

export const PatchMemNickname = async (nickname: string) => {
  await instance.patch(`/api/members`, { memberNickname: nickname });
};

export const GetMyList = async () => instance.get(`/api/members`);

export const GetShareSchedule = async ({ courseId }: { courseId: string }) =>
  instance.get(`/api/courses/${courseId}/share`);

export const GetCourse = async ({ courseId }: { courseId: string }) =>
  instance.get(`/api/courses/${courseId}`);

export const GetCommunityList = async ({
  pageParam,
  limit,
  sort,
  tagName,
}: {
  pageParam: number;
  limit: number;
  sort?: string | undefined;
  tagName?: string | undefined;
}) => {
  const essential = `/api/posts/read?page=${pageParam}&limit=${limit}`;
  const optSort = sort === 'Second' ? '&sort=like' : '';
  const optTagName = tagName ? `&tagName=${tagName}` : '';
  const request = essential + optSort + optTagName;
  const res: AxiosResponse<CommunityListT> = await instance.get(request);
  return {
    communityListData: res.data.data,
    current_page: pageParam,
    isLast:
      res.data.pageInfo.totalPages === pageParam ||
      res.data.pageInfo.totalPages === 0,
  };
};

export const GetCommunityPost = async ({ postId }: { postId: string }) =>
  instance.get(`/api/posts/read/${postId}`);

export const PostCommunity = async ({
  courseId,
  postContent,
  tags,
}: PostReqT) => instance.post(`/api/posts/`, { courseId, postContent, tags });

export const PostComment = async ({
  answerContent,
  postId,
}: {
  answerContent: string;
  postId: string | undefined;
}) => instance.post(`/api/answers/${postId ?? ''}`, { answerContent });

export const DeleteCommunityPost = async ({ postId }: { postId: string }) =>
  instance.delete(`/api/posts/${postId}`);

export const DeleteMyPageCourses = async ({ postId }: { postId: string }) =>
  instance.delete(`/api/courses/${postId}`);

export const PostBookmark = async ({ courseId }: { courseId: number }) =>
  instance.post(`/api/courses/${courseId}/bookmark`);

export const PostLike = async ({ courseId }: { courseId: number }) =>
  instance.post(`/api/courses/${courseId}/like`);

export const DeleteComment = async ({ answerId }: { answerId: number }) =>
  instance.delete(`/api/answers/${answerId}`);

export const PatchComment = async ({
  answerId,
  answerContent,
}: {
  answerId: number;
  answerContent: string;
}) => instance.patch(`/api/answers/${answerId}`, { answerContent });
