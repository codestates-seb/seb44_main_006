import { styled } from 'styled-components';

import cssToken from '../../../styles/cssToken';

interface Prop {
  id: string;
  selectedid: string;
  url: string;
  onClick: (arg0: string, arg1: string) => void;
}

interface StyleProp {
  url: string;
  isactive: boolean;
  onClick: (arg0: string, arg1: string) => void;
}

const ImageDiv = styled.div<StyleProp>`
  width: 20rem;
  height: 14rem;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  border: ${(props) =>
    props.isactive
      ? `3px solid ${cssToken.COLOR['point-900']}`
      : '3px solid transparent'};
  cursor: pointer;
`;

const ImageCard = ({ id, selectedid, url, onClick }: Prop) => {
  const isActive = !!(selectedid && selectedid === id);

  return (
    <ImageDiv
      url={url}
      onClick={() => (onClick ? onClick(id, url) : '')}
      isactive={isActive}
    />
  );
};

export default ImageCard;
