/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const { Kakao } = window;
const shareKakao = ({ url }: { url: string }) => {
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '하루 메이트',
      description: '일정이 도착했어요!',
      imageUrl: './logo.jpg',
      link: {
        mobileWebUrl: url,
        webUrl: url,
      },
    },
    buttons: [
      {
        title: '일정 확인하기',
        link: {
          mobileWebUrl: `https://harumate.netlify.app/${url}`,
          webUrl: `https://harumate.netlify.app/${url}`,
        },
      },
    ],
  });
};

export default shareKakao;
