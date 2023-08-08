import { styled } from 'styled-components';
import { useState } from 'react';

import cssToken from '../../styles/cssToken';
import useMovePage from '../../hooks/useMovePage';
import useLoginToggleModal from '../../hooks/useLoginToggleModal';
import useLogioutoggleModal from '../../hooks/useLogoutToggleModal';
import UserInfoMy from '../ui/UserInfoPfp';
import useUserInfo from '../../querys/useUserInfo';
import notUserImag from '../../assets/notUserImg.svg';
import WhiteButton from '../ui/button/WhiteButton';

type NavT = {
  ispath?: string;
};

const BtnBox = styled.nav`
  display: flex;
  gap: ${cssToken.SPACING['gap-10']};

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.1rem 0.95rem 0.95rem;
    white-space: nowrap;
    transition: ${cssToken.TRANSITION.basic};
    font-size: 13px;
  }
`;

const MenuWrapper = styled.div`
  position: relative;
`;

const MenuToggleBtn = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;

  > div {
    border: 2px solid ${cssToken.COLOR['gray-500']};
    background: ${cssToken.COLOR.white};
  }

  &:hover span {
    border-top: 8px solid ${cssToken.COLOR['gray-500']};
  }
`;

const ArrowFigure = styled.span<NavT>`
  width: 0;
  height: 0;
  border-bottom: 0 solid transparent;
  border-top: ${(props) =>
    props?.ispath === 'community'
      ? `8px solid ${cssToken.COLOR['gray-500']}`
      : `8px solid ${cssToken.COLOR['gray-500']}`};
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;

  &.change_figure {
    border-top: 8px solid ${cssToken.COLOR['gray-900']};
  }
`;

const MenuUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
  width: 150px;
  position: absolute;
  top: 100%;
  margin-top: 0.7rem;
  right: 0px;
  background: #fff;
  overflow: hidden;
`;

const Menuli = styled.li`
  width: 100%;
  &:hover {
    background: #f8f8f8;
  }
`;

const MenuButton = styled.button`
  cursor: pointer;
  width: 100%;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: 0.3s;

  &:hover {
    color: ${cssToken.COLOR['point-900']};
  }
`;

const Nav = ({
  ispath,
  isLoggedIn,
  scrollPosition,
}: {
  ispath: string;
  isLoggedIn: boolean;
  scrollPosition: number;
}) => {
  const gotoCommunity = useMovePage('/community');
  const gotoMypage = useMovePage('/mypage');
  const gotoSetting = useMovePage('/setting');
  const LogintoggleModal = useLoginToggleModal();
  const LogoutoggleModal = useLogioutoggleModal();
  const { userData } = useUserInfo(!!isLoggedIn);
  const [isMenuToggle, setIsMenuToggle] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setIsMenuToggle((prev) => !prev);
  };

  return (
    <BtnBox>
      {isLoggedIn ? (
        <MenuWrapper>
          <MenuToggleBtn onClick={handleMenuToggle}>
            <UserInfoMy
              styles={{
                size: '2.5rem',
              }}
              src={userData?.memberId ? userData?.memberImageUrl : notUserImag}
            />
            <ArrowFigure
              className={scrollPosition < 100 ? '' : 'change_figure'}
              ispath={ispath}
            />
          </MenuToggleBtn>
          {isMenuToggle && (
            <MenuUl onMouseLeave={handleMenuToggle}>
              <Menuli>
                <MenuButton onClick={gotoMypage}>MY</MenuButton>
              </Menuli>
              <Menuli>
                <MenuButton onClick={gotoCommunity}>커뮤니티</MenuButton>
              </Menuli>
              <Menuli>
                <MenuButton onClick={gotoSetting}>설정</MenuButton>
              </Menuli>
              <Menuli>
                <MenuButton onClick={LogoutoggleModal}>로그아웃</MenuButton>
              </Menuli>
            </MenuUl>
          )}
        </MenuWrapper>
      ) : (
        <WhiteButton
          onClick={LogintoggleModal}
          height="25px"
          brradius={`${cssToken.BORDER['rounded-tag']}`}
        >
          로그인
        </WhiteButton>
      )}
    </BtnBox>
  );
};

export default Nav;
