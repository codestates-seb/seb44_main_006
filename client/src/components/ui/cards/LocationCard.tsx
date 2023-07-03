import styled, { css } from 'styled-components';

import TagButton from '../button/TagButton';
import cssToken from '../../../styles/cssToken';

interface LocationInfo {
  title?: string;
  category?: string;
  address?: string;
  phone?: string;
}

const LocationCardContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${cssToken.SPACING['gap-16']};
  gap: ${cssToken.SPACING['gap-10']};
  border: 0.0625rem solid ${cssToken.COLOR['gray-500']};
  border-radius: ${cssToken.BORDER['rounded-md']};
  transition: ${cssToken.TRANSITION.basic};
  &:hover {
    border: 0.0625rem solid ${cssToken.COLOR['point-900']};
  }
`;

const LocationTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LocationTitle = styled.h4`
  font-size: ${cssToken.TEXT_SIZE['text-18']};
`;

const LocationInfoText = css`
  font-size: ${cssToken.TEXT_SIZE['text-14']};
  color: ${cssToken.COLOR['gray-900']};
`;

const LocationAddress = styled.span`
  ${LocationInfoText}
  padding-bottom: ${cssToken.SPACING['gap-24']};
`;

const LocationPhone = styled.span`
  ${LocationInfoText}
`;

const LocationCard = ({ title, category, address, phone }: LocationInfo) => {
  return (
    <LocationCardContainer>
      <LocationTop>
        <LocationTitle>장생당 약국</LocationTitle>
        <TagButton>약국</TagButton>
      </LocationTop>

      <LocationAddress>서울 강남구 테헤란로84길 17</LocationAddress>
      <LocationPhone>02-558-5476</LocationPhone>
    </LocationCardContainer>
  );
};

export default LocationCard;
