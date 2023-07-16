import { styled } from 'styled-components';

import { LoginState } from '../../store/userAuth-slice';
import cssToken from '../../styles/cssToken';
import WhiteButton from '../ui/button/WhiteButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import useMovePage from '../../hooks/useMovePage';
import useLoginToggleModal from '../../hooks/useLoginToggleModal';
import useLogioutoggleModal from '../../hooks/useLogoutToggleModal';

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
  ispath,
  isLoggedIn,
}: {
  ispath: string;
  isLoggedIn: LoginState['isLogin'];
}) => {
  const gotoCommunity = useMovePage('/community');
  const gotoMypage = useMovePage('/mypage');
  const LogintoggleModal = useLoginToggleModal();
  const LogoutoggleModal = useLogioutoggleModal();

  return (
    <BtnBox>
      {!ispath && isLoggedIn && (
        // 메인 페이지인 경우
        <>
          <WhiteButton
            onClick={LogoutoggleModal}
            height="25px"
            brradius={`${cssToken.BORDER['rounded-tag']}`}
          >
            로그아웃
          </WhiteButton>
          <SkyBlueButton
            onClick={gotoMypage}
            height="25px"
            brradius={`${cssToken.BORDER['rounded-tag']}`}
          >
            마이페이지
          </SkyBlueButton>
        </>
      )}
      {ispath && isLoggedIn && (
        // 메인 페이지가 아닌 나머지
        <>
          <WhiteButton
            onClick={LogoutoggleModal}
            height="25px"
            brradius={`${cssToken.BORDER['rounded-tag']}`}
          >
            로그아웃
          </WhiteButton>
          <SkyBlueButton
            onClick={ispath === 'mypage' ? gotoCommunity : gotoMypage}
            height="25px"
            brradius={`${cssToken.BORDER['rounded-tag']}`}
          >
            {ispath === 'mypage' ? '커뮤니티' : '마이페이지'}
          </SkyBlueButton>
        </>
      )}
      {ispath && !isLoggedIn && (
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
