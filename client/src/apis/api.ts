import axios from 'axios';

import { PostReqT } from '../types/apitype';

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';

const accessToken = `Bearer ${import.meta.env.VITE_API_SERVER_KEY}`;

export const instance = axios.create({
  baseURL: PROXY,
  headers: {
    'Content-Type': 'application/json',
    Authorization: accessToken,
  },
});

// instance.interceptors.request.use((config) => {

// })

export const GetMyList = async () => instance.get(`/api/members`);
export const GetCourse = async ({ courseId }: { courseId: string }) =>
  instance.get(`/api/courses/${courseId}`);

export const GetCommunityList = async ({
  page,
  limit,
  sort,
}: {
  page: number;
  limit: number;
  sort: string;
}) =>
  instance.get(
    `/api/posts?page=${page}&limit=${limit}${
      sort === 'Like' ? '&sort=like' : ''
    }`
  );

export const GetSearch = async ({
  page,
  limit,
  tagName,
  sort,
}: {
  page: number;
  limit: number;
  tagName: string;
  sort: string;
}) =>
  instance.get(
    `/api/posts/tagged/${tagName}?page=${page}&limit=${limit}${
      sort === 'Like' ? '&sort=like' : ''
    }`
  );

export const PostCommunity = async ({
  courseId,
  postContent,
  tags,
}: PostReqT) => instance.post(`/api/posts`, { courseId, postContent, tags });
