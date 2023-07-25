import { styled } from 'styled-components';

const LandingVideoWrapper = styled.video`
  width: 45%;
  min-width: 30%;
  @media screen and (max-width: 760px) {
    width: 80%;
  }
`;

const LandingVideo = ({ src }: { src: string }) => {
  return (
    <LandingVideoWrapper autoPlay muted loop playsInline>
      <source src={src} type="video/mp4" />
    </LandingVideoWrapper>
  );
};

export default LandingVideo;
