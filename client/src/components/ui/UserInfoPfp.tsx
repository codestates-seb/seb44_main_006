import styled from 'styled-components';

import cssToken from '../../styles/cssToken';

type UserInfoStyle = {
  size?: string;
};

interface UserInfo {
  styles?: UserInfoStyle;
  src?: string;
  alt?: string;
}

export const UserImgContainer = styled.div<UserInfoStyle>`
  border-radius: ${cssToken.BORDER['rounded-full']};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.size ? props.size : '5.3125rem')};
`;

export const Img = styled.img`
  object-fit: cover;
  width: ${cssToken.WIDTH['w-full']};
  height: ${cssToken.HEIGHT['h-full']};
`;

const UserInfoMy = ({ styles, src }: UserInfo) => {
  return (
    <UserImgContainer {...styles}>
      <Img src={src} alt="userImg" />
    </UserImgContainer>
  );
};

export default UserInfoMy;
