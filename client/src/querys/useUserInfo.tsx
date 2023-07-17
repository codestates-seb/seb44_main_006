import { useQuery } from '@tanstack/react-query';

import { GetUserInfo } from '../apis/api';

export type UserInfoT = {
  memberId: number; // 고유값(회원 식별자)
  memberEmail: string; // 고유값(회원 이메일)
  memberNickname: string; // 회원 닉네임
  memberImageUrl: string; // 회원 이미지 URL
  myCourseCount: number; // 내가 작성한 코스의 개수
  myBookmarkCount: number; // 내가 즐겨찾기한 커뮤니티 글의 개수
};

const useUserInfo = (enabled: boolean) => {
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: GetUserInfo,
    refetchOnWindowFocus: false,
    select: (data: { data: UserInfoT }) => data.data,
    enabled,
  });
  return {
    userData,
  };
};

export default useUserInfo;
