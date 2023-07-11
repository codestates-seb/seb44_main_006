import shareKakao from '../../../utils/shareKakao';
import KakaoIcon from '../../../assets/icons/KakaoIcon';
import { ShareBtn } from '../../../styles/styles';

const ShareKakaoButton = ({
  endpoint,
  title,
  description,
}: {
  endpoint: string;
  title?: string;
  description?: string;
}) => {
  return (
    <ShareBtn
      type="button"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        shareKakao({ url: endpoint, title, description });
      }}
    >
      <KakaoIcon />
    </ShareBtn>
  );
};

export default ShareKakaoButton;
