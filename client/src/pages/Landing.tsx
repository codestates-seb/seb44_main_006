import { styled } from 'styled-components';

import { FlexDiv } from '../styles/styles';
import Title from '../components/ui/text/Title';
import SubTitle from '../components/ui/text/SubTitle';
import cssToken from '../styles/cssToken';
import { landingData } from '../utils/constant/constant';

const LadingWrapper = styled(FlexDiv)`
  cursor: none;
  flex-direction: column;
  align-items: center;
  padding-left: ${cssToken.SPACING['py-100']};
  padding-right: ${cssToken.SPACING['py-100']};

  @media screen and (max-width: 1280px) {
    cursor: default;
    padding-left: ${cssToken.SPACING['gap-10']};
    padding-right: ${cssToken.SPACING['gap-10']};
  }
`;

const LandingContainer = styled(FlexDiv)`
  width: 100%;
  height: 70vh;
  justify-content: space-around;
  align-items: center;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const TextContainer = styled(FlexDiv)`
  flex-direction: column;
  row-gap: ${cssToken.SPACING['gap-20']};
  padding-left: 3.375rem;
  > h1,
  h3 {
    white-space: pre-line;
  }
  > h3 {
    line-height: 1.5rem;
  }
  > p {
    position: absolute;
    top: -5rem;
  }

  @media screen and (max-width: 1000px) {
    padding-left: 0rem;
    > h1 {
      text-align: center;
      font-size: ${cssToken.TEXT_SIZE['text-24']};
      line-height: 1.7rem;
    }
    > h3 {
      text-align: center;
      font-size: ${cssToken.TEXT_SIZE['text-12']};
      line-height: 1rem;
      margin-bottom: ${cssToken.SPACING['gap-10']};
    }
    > p {
      top: -3rem;
      text-align: center;
    }
  }
`;

const LandingVideo = styled.video`
  width: 45%;
  min-width: 30%;
  @media screen and (max-width: 760px) {
    width: 80%;
  }
`;

const LandingImg = styled.img`
  width: 45%;
  min-width: 30%;
  @media screen and (max-width: 760px) {
    width: 80%;
  }
`;

const Landing = () => {
  return (
    <LadingWrapper>
      {landingData.map((data, idx) => (
        <LandingContainer>
          <TextContainer>
            <Title styles={{ size: cssToken.TEXT_SIZE['text-40'] }}>
              {data.title}
            </Title>
            <SubTitle
              styles={{
                size: cssToken.TEXT_SIZE['text-16'],
                weight: cssToken.FONT_WEIGHT.medium,
                color: cssToken.COLOR['gray-900'],
              }}
            >
              {data.description}
            </SubTitle>
          </TextContainer>
          {idx < 4 ? (
            <LandingVideo autoPlay muted loop playsInline>
              <source src={data.src} type="video/mp4" />
            </LandingVideo>
          ) : (
            <LandingImg src={data.src} alt="image" />
          )}
        </LandingContainer>
      ))}
    </LadingWrapper>
  );
};

export default Landing;
