import { styled } from 'styled-components';

import cssToken from '../../styles/cssToken';
import useLocationEndpoint from '../../hooks/useLocationEndpoint';

type FootreStyle = {
  ispath?: string;
};

const FooterContainer = styled.footer<FootreStyle>`
  display: ${(props) => {
    if (
      props?.ispath === 'community' ||
      props?.ispath === 'mypage' ||
      props?.ispath === ''
    ) {
      return 'flex';
    }
    return 'none';
  }};
  align-items: center;
  justify-content: center;
  background: ${cssToken.COLOR['gray-900']};
  flex-direction: column;
  padding: ${cssToken.SPACING['gap-40']} 0;

  @media (max-width: 768px) {
    display: none;
    margin-bottom: 4.5rem;
    padding: ${cssToken.SPACING['gap-24']} 0;
  }
`;

const FooterText = styled.p`
  font-size: ${cssToken.TEXT_SIZE['text-12']};
  color: ${cssToken.COLOR['gray-300']};
  padding: 0.3125rem 0;
  font-weight: 300;
`;

const InfoText = styled.ul`
  display: flex;
  gap: 0.3125rem;
  margin-bottom: 10px;

  > li {
    display: flex;
    align-items: center;
    gap: 0.3125rem;

    &::after {
      content: '';
      width: 3px;
      height: 3px;
      border-radius: 50px;
      background: ${cssToken.COLOR['gray-500']};
    }

    &:last-child::after {
      display: none;
    }

    > a {
      text-decoration: none;
      color: ${cssToken.COLOR['gray-500']};
      font-size: 0.8125rem;
      font-weight: 400;
      position: relative;
      padding: 0.5rem;
      border-radius: 0.3125rem;
      transition: 0.3s;

      > span {
        position: absolute;
        top: 0.8125rem;
        left: 50%;
        width: 140%;
        font-size: 0.75rem;
        text-align: center;
        padding: 0.3125rem;
        border-radius: 0.625rem;
        transform: translate(-50%, 0);
        color: #fff;
        opacity: 0;
        transition: 0.3s;
      }

      &:hover {
        color: #fff;
        background: #7a7a7a;
        color: ${cssToken.COLOR['point-900']};
      }

      &:hover span {
        opacity: 1;
        top: -1.5625rem;
      }
    }
  }
`;

const Footer = () => {
  const ispath = useLocationEndpoint();

  return (
    <FooterContainer ispath={ispath}>
      <InfoText>
        <li>
          <a
            href="https://github.com/novice-hero"
            target="_blank"
            rel="noreferrer"
          >
            novice-hero
            <span>Front-End</span>
          </a>
        </li>
        <li>
          <a href="https://github.com/R-jisu" target="_blank" rel="noreferrer">
            R-jisu
            <span>Front-End</span>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/jieun419"
            target="_blank"
            rel="noreferrer"
          >
            jieun419
            <span>Front-End</span>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/BlancCarte"
            target="_blank"
            rel="noreferrer"
          >
            BlancCarte
            <span>Back-End</span>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/MignonSS"
            target="_blank"
            rel="noreferrer"
          >
            MignonSS
            <span>Back-End</span>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/atreeud12"
            target="_blank"
            rel="noreferrer"
          >
            atreeud12
            <span>Back-End</span>
          </a>
        </li>
      </InfoText>
      <FooterText>Copyright2023. 6 can do it all rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
