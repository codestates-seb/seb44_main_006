import styled from 'styled-components';

import cssToken from '../../../styles/cssToken';

const ThumbnailContainer = styled.div`
  position: relative;
  border-radius: ${cssToken.BORDER['rounded-s']};
  overflow: hidden;
  width: ${cssToken.WIDTH['w-full']};
  height: 0;
  padding-bottom: 50%;
`;

export const Img = styled.img`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  object-fit: cover;
  width: ${cssToken.WIDTH['w-full']};
  height: ${cssToken.HEIGHT['h-full']};
`;

const ThumbnailBox = () => {
  return (
    <ThumbnailContainer>
      <Img src="https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/big/202310454292163523295.jpg" />
    </ThumbnailContainer>
  );
};

export default ThumbnailBox;
