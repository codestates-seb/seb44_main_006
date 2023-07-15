import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UserQAuthInfo, setUserOAuthActions } from '../../store/userAuth-slice';
import useLoginToggleModal from '../../hooks/useLoginToggleModal';
import useLogioutoggleModal from '../../hooks/useLogoutToggleModal';
import { RootState } from '../../store';
import LoginModal from '../ui/modal/LoginModal';
import Modal from '../ui/modal/Modal';
import useMovePage from '../../hooks/useMovePage';
import { GetUserInfo, RemoveUserInfo } from '../../apis/api';
import ModalChildren from '../community/post/ModalChildren';

const MemAccountModal = () => {
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');
  const navigate = useNavigate();
  const gotoMain = useMovePage('/');
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
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
      const handleSuccess = async () => {
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
        await queryClient.invalidateQueries(['oauthInfoData']);
      };

      handleSuccess().catch((error) => {
        if (accessToken) {
          const { response } = error as AxiosError;
          if (response) navigate(`/error/${response.status}`);
        }
      });
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
          styles={{
            width: '47.0625rem',
            height: '28.375rem',
          }}
        >
          <ModalChildren
            leftBtnCallback={(e) => {
              e.stopPropagation();
              LogoutoggleModal();
            }}
            rightBtnCallback={(e) => {
              e.stopPropagation();
              handleLogout();
            }}
            content="정말 로그아웃 하시겠습니까?"
          />
        </Modal>
      )}
    </>
  );
};

export default MemAccountModal;
