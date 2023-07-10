import axios from 'axios';

import { CommunityListT, PostReqT } from '../types/apitype';

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

export const instance = axios.create({
  baseURL: PROXY,
  headers: {
    'Content-Type': 'application/json;',
    Authorization: accessToken,
    RefreshToken: refreshToken,
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = accessToken;
    config.headers.RefreshToken = refreshToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const GetUserInfo = async () => instance.get(`/api/auth/members`);

export const RemoveUserInfo = async () => instance.post('/api/auth/logout');

export const GetMyList = async () => instance.get(`/api/members`);

export const GetCourse = async ({ courseId }: { courseId: string }) =>
  instance.get(`/api/courses/${courseId}`);

export const GetCommunityList = async ({
  page,
  limit,
  sort,
  tagName,
}: {
  page: number;
  limit: number;
  sort?: string | undefined;
  tagName?: string | undefined;
}) => {
  const essential = `/api/posts/read?page=${page}&limit=${limit}`;
  const optSort = sort === 'Like' ? '&sort=like' : '';
  const optTagName = tagName ? `&tagName=${tagName}` : '';
  const request = essential + optSort + optTagName;
  const result = await instance.get(request);
  return result.data;
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
