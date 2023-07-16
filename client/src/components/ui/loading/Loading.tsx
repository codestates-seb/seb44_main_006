import { styled } from 'styled-components';

import cssToken from '../../../styles/cssToken';

const Wrapper = styled.div`
  width: ${cssToken.WIDTH['w-screen']};
  height: ${cssToken.HEIGHT['h-screen']};
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingImg = styled.img`
  @media (max-width: 1280px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const TextSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${cssToken.COLOR['gray-900']};

  @media (max-width: 1280px) {
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const BottomImg = styled.img`
  position: fixed;
  bottom: 0;
`;

const Loading = () => {
  return (
    <Wrapper>
      <LoadingImg src="/loading_Img.png" alt="로딩이미지" />
      <TextSpan>데이터를 불러오는 중입니다...</TextSpan>
      <BottomImg src="/bottom_gradation.png" alt="아래이미지" />
    </Wrapper>
  );
};

export default Loading;
