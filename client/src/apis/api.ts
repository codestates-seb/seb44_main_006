import axios from 'axios';

import { PostReqT } from '../types/apitype';

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';

const accessToken = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoid2x0bjE0MThAZ21haWwuY29tIiwic3ViIjoie1widXNlcm5hbWVcIjpcIndsdG4xNDE4QGdtYWlsLmNvbVwiLFwidG9rZW5UeXBlXCI6XCJBY2Nlc3NUb2tlblwifSIsImlhdCI6MTY4ODczNjUxOCwiZXhwIjoxNjkxNzM2NTE4fQ.5IE_AMaGYBWxb3MF9721cXZ3836-kIisTfRtepu5T9_pVZ8aBcyQjT5KKYhg-3RqZbZa6e1G8-Plb0VJfUZs5g`;
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
