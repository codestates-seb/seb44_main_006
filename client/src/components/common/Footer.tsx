import { styled } from 'styled-components';

import cssToken from '../../styles/cssToken';

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${cssToken.COLOR['gray-300']};
`;

const FooterText = styled.p`
  font-size: ${cssToken.TEXT_SIZE['text-16']};
  color: ${cssToken.COLOR['gray-700']};
  padding: ${cssToken.SPACING['gap-40']} 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>Copyright2023. 6 can do it all rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
