import styled from 'styled-components';

import cssToken from '../../../styles/cssToken';

type ThumbnailStyle = {
  width?: string;
  height?: string;
  borderRadius?: string;
};

interface Thumbnail {
  styles?: ThumbnailStyle;
  src?: string;
  alt?: string;
}

const ThumbnailContainer = styled.div<ThumbnailStyle>`
  position: relative;
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '0')};
  overflow: hidden;
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '0')};
  padding-bottom: ${(props) => (props.height === '0' ? '50%' : 'auto')};
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

const ThumbnailBox = ({ src, styles }: Thumbnail) => {
  return (
    <ThumbnailContainer {...styles}>
      <Img src={src} alt="ThumbnailImg" />
    </ThumbnailContainer>
  );
};

export default ThumbnailBox;
