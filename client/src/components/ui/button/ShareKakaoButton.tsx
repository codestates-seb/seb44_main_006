import shareKakao from '../../../utils/shareKakao';

const ShareKakaoButton = ({ endpoint }: { endpoint: string }) => {
  return (
    <button
      type="button"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        shareKakao({ url: endpoint });
      }}
    >
      공유
    </button>
  );
};

export default ShareKakaoButton;
