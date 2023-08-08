import { styled } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import cssToken from '../../styles/cssToken';
import UserInfoMy from '../ui/UserInfoPfp';
import useLoginToggleModal from '../../hooks/useLoginToggleModal';
import useLocationEndpoint from '../../hooks/useLocationEndpoint';
import useUserInfo from '../../querys/useUserInfo';
import notUserImag from '../../assets/notUserImg.svg';
import getLoginStatus from '../../utils/getLoginStatus';
import CalendarPageIcon from '../../assets/icons/CalendarPageIcon';
import CommunityPageIcon from '../../assets/icons/CommunityPageIcon';
import MainPageIcon from '../../assets/icons/MainPageIcon';
import MyPageIcon from '../../assets/icons/MyPageIcon';

type HeaderStyle = {
  ispath?: string;
  ispathPull?: string;
};

const MoNavContainer = styled.nav<HeaderStyle>`
  display: none;
  @media (max-width: 768px) {
    display: ${(props) => {
      if (
        props?.ispath === 'register' ||
        props?.ispath === 'setting' ||
        props?.ispathPull === '/community/select'
      ) {
        return 'none';
      }
      return 'grid';
    }};
    height: 4.5rem;
    position: fixed;
    bottom: 0;
    background-color: ${cssToken.COLOR.white};
    border-top: 1px solid ${cssToken.COLOR['gray-600']};
    width: ${cssToken.WIDTH['w-full']};
    grid-template-columns: repeat(4, 1fr);
    z-index: 999;

    > a {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
      text-decoration: none;
      color: ${cssToken.COLOR['gray-900']};
      padding: 0.625rem 0 1rem 0;
      font-size: 0.7rem;
      justify-content: space-around;

      > svg {
        width: 1.125rem;
      }

      &.active {
        color: ${cssToken.COLOR.black};
        > svg path {
          fill: ${cssToken.COLOR.black};
        }
      }
    }

    > a:last-child svg {
      width: 1.5rem;
    }
  }
`;

const DivBox = styled.div<HeaderStyle>`
  @media (max-width: 768px) {
    display: ${(props) => {
      if (
        props?.ispath === 'register' ||
        props?.ispath === 'setting' ||
        props?.ispathPull === '/community/select'
      ) {
        return 'none';
      }
      return 'block';
    }};
    width: 100%;
    height: 4.5rem;
  }
`;

const MoNav = () => {
  const isLoggedIn = getLoginStatus();
  const LogintoggleModal = useLoginToggleModal();
  const { userData } = useUserInfo(!!isLoggedIn);
  const ispath = useLocationEndpoint();
  const location = useLocation();
  const pathPull = location?.pathname;

  return (
    <>
      <DivBox />
      <MoNavContainer ispath={ispath} ispathPull={pathPull}>
        <Link to="/" className={!ispath ? 'active' : ''}>
          <MainPageIcon />
          <span>메인</span>
        </Link>
        <Link
          onClick={isLoggedIn ? undefined : LogintoggleModal}
          to={isLoggedIn ? '/register' : '/'}
        >
          <CalendarPageIcon />
          <span>일정 등록</span>
        </Link>
        <Link
          to="/community"
          className={ispath === 'community' ? 'active' : ''}
        >
          <CommunityPageIcon />
          <span>커뮤니티</span>
        </Link>
        <Link
          onClick={isLoggedIn ? undefined : LogintoggleModal}
          to={isLoggedIn ? '/mypage' : '/'}
          className={ispath === 'mypage' ? 'active' : ''}
        >
          {userData && isLoggedIn ? (
            <UserInfoMy
              styles={{
                size: '1.5rem',
              }}
              src={
                !userData.memberImageUrl ? notUserImag : userData.memberImageUrl
              }
            />
          ) : (
            <MyPageIcon />
          )}
          <span>MY</span>
        </Link>
      </MoNavContainer>
    </>
  );
};

export default MoNav;
