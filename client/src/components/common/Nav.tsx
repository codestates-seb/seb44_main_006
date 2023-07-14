import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';

import { setUserOAuthActions, LoginState } from '../../store/userAuth-slice';
import cssToken from '../../styles/cssToken';
import WhiteButton from '../ui/button/WhiteButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import useMovePage from '../../hooks/useMovePage';

const BtnBox = styled.nav`
  display: flex;
  gap: ${cssToken.SPACING['gap-10']};

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.2rem 0.95rem 0.95rem;
    white-space: nowrap;
    transition: ${cssToken.TRANSITION.basic};
    font-size: 14px;
  }
`;

const Nav = ({
  isPath,
  isLoggedIn,
}: {
  isPath: string;
  isLoggedIn: LoginState;
}) => {
  const gotoCommunity = useMovePage('/community');
  const gotoMypage = useMovePage('/mypage');
  const dispatch = useDispatch();

  const LogintoggleModal = () => {
    dispatch(setUserOAuthActions.toggleIsLogin());
  };

  const LogoutoggleModal = () => {
    dispatch(setUserOAuthActions.toggleIsLogout());
  };

  return (
    <BtnBox>
      {!isPath && isLoggedIn && (
        // 메인 페이지인 경우
        <>
          <WhiteButton
            onClick={LogoutoggleModal}
            height="25px"
            borderRadius={`${cssToken.BORDER['rounded-tag']}`}
          >
            로그아웃
          </WhiteButton>
          <SkyBlueButton
            onClick={gotoMypage}
            height="25px"
            borderRadius={`${cssToken.BORDER['rounded-tag']}`}
          >
            마이페이지
          </SkyBlueButton>
        </>
      )}
      {isPath && isLoggedIn && (
        // 메인 페이지가 아닌 나머지
        <>
          <WhiteButton
            onClick={LogoutoggleModal}
            height="25px"
            borderRadius={`${cssToken.BORDER['rounded-tag']}`}
          >
            로그아웃
          </WhiteButton>
          <SkyBlueButton
            onClick={isPath === 'mypage' ? gotoCommunity : gotoMypage}
            height="25px"
            borderRadius={`${cssToken.BORDER['rounded-tag']}`}
          >
            {isPath === 'mypage' ? '커뮤니티' : '마이페이지'}
          </SkyBlueButton>
        </>
      )}
      {isPath && !isLoggedIn && (
        <WhiteButton
          onClick={LogintoggleModal}
          height="25px"
          borderRadius={`${cssToken.BORDER['rounded-tag']}`}
        >
          로그인
        </WhiteButton>
      )}
    </BtnBox>
  );
};

export default Nav;
