import Copy from '../../../assets/Copy';
import { ShareBtn } from '../../../styles/styles';

const CopyButton = ({ endpoint }: { endpoint: string }) => {
  return (
    <ShareBtn
      type="button"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        navigator.clipboard
          .writeText(`https://harumate.netlify.app/${endpoint}`)
          .then(() => {
            // Todo 추가기능 토스트
            console.log('복사완료');
          })
          .catch(() => console.log('복사실패'));
      }}
    >
      <Copy />
    </ShareBtn>
  );
};

export default CopyButton;
