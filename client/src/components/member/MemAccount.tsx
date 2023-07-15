import { styled } from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UserQAuthInfo, setUserOAuthActions } from '../../store/userAuth-slice';
import useLoginToggleModal from '../../hooks/useLoginToggleModal';
import useLogioutoggleModal from '../../hooks/useLogoutToggleModal';
import { RootState } from '../../store';
import cssToken from '../../styles/cssToken';
import GrayButton from '../ui/button/GrayButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import LoginModal from '../ui/modal/LoginModal';
import Modal from '../ui/modal/Modal';
import useMovePage from '../../hooks/useMovePage';
import { GetUserInfo, RemoveUserInfo } from '../../apis/api';
import Text from '../ui/text/Text';

const BtnBox = styled.div`
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
const MemAccountModal = () => {
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');
  const navigate = useNavigate();
  const gotoMain = useMovePage('/');
  const dispatch = useDispatch();
  const LogintoggleModal = useLoginToggleModal();
  const LogoutoggleModal = useLogioutoggleModal();

  const LoginmodalIsOpen = useSelector(
    (state: RootState) => state.userAuth.isLoginOpen
  );
  const LogoutmodalIsOpen = useSelector(
    (state: RootState) => state.userAuth.isLogoutOpen
  );

  const mutation = useMutation(RemoveUserInfo, {
    onSuccess() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('isLogin');
      gotoMain();
      return window.location.reload();
    },
    onError(error) {
      throw error;
    },
  });

  const handleLogout = () => {
    dispatch(setUserOAuthActions.setIsLogin(false));
    mutation.mutate();
  };

  // TODO: Redux toolkit 이용해 전역으로 유저 정보 관리하기
  //! 유저 정보 새로고침해야 값을 받을 수 있는 이슈
  useQuery({
    queryKey: ['oauthInfoData'],
    queryFn: () => GetUserInfo(),
    onSuccess: (data) => {
      dispatch(setUserOAuthActions.setUserOAuth(data.data as UserQAuthInfo));
      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', `Bearer ${accessToken}`);
        localStorage.setItem('refreshToken', `${refreshToken}`);
        localStorage.setItem('isLogin', JSON.stringify(true));
        if (localStorage.getItem('isLogin')) {
          dispatch(setUserOAuthActions.setIsLogin(true));
        }
        gotoMain();
      }
    },
    onError: (error) => {
      if (accessToken) {
        const { response } = error as AxiosError;
        if (response) navigate(`/error/${response.status}`);
      }
    },
  });

  return (
    <>
      {LoginmodalIsOpen && (
        <LoginModal
          handleClose={LogintoggleModal}
          styles={{
            width: '31.25rem',
            height: '31.25rem',
            borderradius: '0.9375rem',
            gap: '0.625rem',
          }}
        />
      )}
      {LogoutmodalIsOpen && (
        <Modal
          backdropCallback={LogoutoggleModal}
          handleCloseBtn={LogoutoggleModal}
          displayclosebtn
          styles={{
            width: '47.0625rem',
            height: '28.375rem',
            borderradius: '0.9375rem',
            gap: '3.125rem',
          }}
        >
          <Text styles={{ size: cssToken.TEXT_SIZE['text-50'] }}>
            로그아웃 하시겠습니까?
          </Text>
          <BtnBox>
            <GrayButton
              width="15.5625rem"
              height="4.625rem"
              fontsize={cssToken.TEXT_SIZE['text-24']}
              brradius={cssToken.BORDER['rounded-md']}
              onClick={LogoutoggleModal}
            >
              아니오
            </GrayButton>
            <SkyBlueButton
              width="15.5625rem"
              height="4.625rem"
              fontsize={cssToken.TEXT_SIZE['text-24']}
              brradius={cssToken.BORDER['rounded-md']}
              onClick={handleLogout}
            >
              예
            </SkyBlueButton>
          </BtnBox>
        </Modal>
      )}
    </>
  );
};

export default MemAccountModal;
