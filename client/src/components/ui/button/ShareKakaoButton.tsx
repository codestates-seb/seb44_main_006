import { styled } from 'styled-components';

import shareKakao from '../../../utils/shareKakao';

const Button = styled.button`
  cursor: pointer;
`;

const ShareKakaoButton = ({ endpoint }: { endpoint: string }) => {
  return (
    <Button
      type="button"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        shareKakao({ url: endpoint });
      }}
    >
      공유
    </Button>
  );
};

export default ShareKakaoButton;
