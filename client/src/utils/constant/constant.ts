import {
  communityMP4,
  editSaveMP4,
  scheduleEditDeleteMP4,
  scheduleSearchMP4,
  shareIMG,
  responsiveIMG,
} from '../../assets/landing/index';

const defaultOptions = {
  level: 6,
  lat: 37.553651,
  lng: 126.969763,
};

export default defaultOptions;

export const LIMIT = 12;

export const modules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  },
};

export const landingData = [
  {
    title: '나만의 일정 만들기',
    description:
      '로그인 후 일정등록(Schedule)페이지에서 \n 나만의 일정을 만들 수 있어요.\n\n 직접 검색을 통해 "맛집", "카페" 등 키워드 및 \n 가고 싶은 장소를 입력할 수 있어요. \n 카테고리 검색 시 반경과 카테고리 필터를 통해 장소를 추천해요. \n 반경은 마지막으로 추가한 장소를 기준으로 적용돼요.',
    src: scheduleSearchMP4,
  },
  {
    title: '일정 편집 및 저장하기',
    description:
      '드래그를 통해 등록한 일정 순서를 바꾸고 \n 삭제 버튼을 눌러 일정을 삭제할 수 있어요.\n일정에 어울리는 썸네일, 제목, 날짜 그리고 설명을 작성해주세요.\n 저장하기 버튼을 눌러서 일정을 저장할 수 있어요.',
    src: editSaveMP4,
  },
  {
    title: '일정 수정 및 삭제하기',
    description: '마이페이지에서 기존 일정을 수정하고 삭제할 수 있어요.',
    src: scheduleEditDeleteMP4,
  },
  {
    title: '일정 자랑하기',
    description:
      '자랑하기 버튼을 눌러 커뮤니티에 나의 일정을 자랑할 수 있어요.\n 마음에 드는 일정에 댓글을 달고 좋아요를 눌러보세요.',
    src: communityMP4,
  },
  {
    title: '하루를 함께 보낼 \n 친구에게 공유하기',
    description:
      '카카오톡과 링크 복사를 통해 \n 친구에게 마음에 드는 일정을 공유할 수 있어요.',
    src: shareIMG,
  },
  {
    title: '모바일에서도 \n 하루메이트와 함께',
    description: '하루 일정을 만들고 \n 공유하는 나의 하루 메이트',
    src: responsiveIMG,
  },
];
