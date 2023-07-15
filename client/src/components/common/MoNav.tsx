import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import cssToken from '../../styles/cssToken';
import CalendarPageIcon from '../../assets/CalendarPageIcon';
import CommunityPageIcon from '../../assets/CommunityPageIcon';
import MainPageIcon from '../../assets/MainPageIcon';
import MyPageIcon from '../../assets/MyPageIcon';
import UserInfoMy from '../ui/UserInfoPfp';
import { RootState } from '../../store';
import useLoginToggleModal from '../../hooks/useLoginToggleModal';

const MoNavContainer = styled.nav`
  display: none;
  @media (max-width: 640px) {
    position: fixed;
    bottom: 0;
    display: grid;
    background-color: #fff;
    border-top: 1px solid #dcdcdc;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    z-index: 999;

    > a {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: ${cssToken.COLOR['gray-900']};
      padding: 10px 0;
      font-size: 13px;
      justify-content: flex-end;
    }
  }
`;

const MoNav = () => {
  const isLoggedIn = useSelector((state: RootState) => state.userAuth.isLogin);
  const LogintoggleModal = useLoginToggleModal();
  const userAuthInfo = useSelector(
    (state: RootState) => state.userAuth.userInfo
  );

  return (
    <MoNavContainer>
      <Link to="/">
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
      <Link to="/community">
        <CommunityPageIcon />
        <span>커뮤니티</span>
      </Link>
      <Link
        onClick={isLoggedIn ? undefined : LogintoggleModal}
        to={isLoggedIn ? '/mypage' : '/'}
      >
        {isLoggedIn ? (
          <UserInfoMy
            styles={{
              size: '1.75rem',
            }}
            src={userAuthInfo?.memberImageUrl}
          />
        ) : (
          <MyPageIcon />
        )}
        <span>MY</span>
      </Link>
    </MoNavContainer>
  );
};

export default MoNav;
