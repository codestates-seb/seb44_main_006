import axios from 'axios';

import { PostReqT } from '../types/apitype';

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';

const accessToken = import.meta.env.VITE_API;
export const instance = axios.create({
  baseURL: PROXY,
  headers: {
    'Content-Type': 'application/json',
    Authorization: accessToken,
  },
});

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
  sort: string;
  tagName?: string | undefined;
}) => {
  return instance.get(
    `/api/posts/read?page=${page}&limit=${limit}${
      sort === 'Like' ? '&sort=like' : ''
    }${tagName ? `&tagName=${tagName}` : ''}`
  );
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
