import axios from 'axios';

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';

const accessToken =
  'Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiY3JnMTA1MEBuYXZlci5jb20iLCJzdWIiOiJ7XCJ1c2VybmFtZVwiOlwiY3JnMTA1MEBuYXZlci5jb21cIixcInRva2VuVHlwZVwiOlwiQWNjZXNzVG9rZW5cIn0iLCJpYXQiOjE2ODg2NDIzODgsImV4cCI6MTY5MTY0MjM4OH0.iGMGdVVYg0V6Vcmfq3juWMt2D9KzS1Wfq7RBhRWr-ith5NF0V05RQJFvUqmAEC76TAKxlKF1kZIovND2dL-D5w';

export const instance = axios.create({
  baseURL: PROXY,
  headers: {
    'Content-Type': 'application/json',
    Authorization: accessToken,
  },
});

// instance.interceptors.request.use((config) => {

// })

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
