import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setUserOAuthActions, LoginState } from '../../store/userAuth-slice';
import cssToken from '../../styles/cssToken';
import WhiteButton from '../ui/button/WhiteButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import useMovePage from '../../hooks/useMovePage';
import CalendarPageIcon from '../../assets/CalendarPageIcon';
import CommunityPageIcon from '../../assets/CommunityPageIcon';
import MainPageIcon from '../../assets/MainPageIcon';
import MyPageIcon from '../../assets/MyPageIcon';
import UserInfoPfp from '../ui/UserInfoPfp';

const MoNavContainer = styled.nav`
  display:none;
  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    display: grid;
    background-color: #fff;
    border-top: 1px solid #dcdcdc;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);

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
  return (
    <MoNavContainer>
      <Link to='/'>
        <MainPageIcon />
        <span>메인</span>
      </Link>
      <Link to='register'>
        <CalendarPageIcon />
        <span>일정 등록</span>
      </Link>
      <Link to='/coummunity'>
        <CommunityPageIcon />
        <span>커뮤니티</span>
      </Link>
      <Link to='/maypage'>
        <MyPageIcon />
        <span>MY</span>
      </Link>
    </MoNavContainer>
  );
};

export default MoNav;
