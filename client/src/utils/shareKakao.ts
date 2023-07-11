/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const { Kakao } = window;
const shareKakao = ({
  url,
  title = '일정이 도착했어요!',
  description = '일정을 만들고 공유해요',
}: {
  url: string;
  title?: string;
  description?: string;
}) => {
  Kakao.Share.sendScrap({
    requestUrl: `https://harumate.netlify.app/${url}`,
    templateId: 95916,
    templateArgs: {
      title,
      description,
      pagePathname: url,
    },
  });
};

export default shareKakao;
