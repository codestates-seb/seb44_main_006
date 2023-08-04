import { styled } from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../../store';
import cssToken from '../../styles/cssToken';
import UserInfoMy from '../../components/ui/UserInfoPfp';
import SkyBlueEventButton from '../../components/ui/button/SkyBlueEventButton';
import CloseButton from '../../components/ui/button/CloseButton';
import useLogioutoggleModal from '../../hooks/useLogoutToggleModal';
import { DeleteAccount } from '../../apis/api';
import Modal from '../../components/ui/modal/Modal';
import ModalChildren from '../../components/community/post/ModalChildren';
import useMovePage from '../../hooks/useMovePage';
import useToggleModal from '../../hooks/useToggleModal';
// import { setThemeModeActions } from '../../store/thememode-slice';
import showToast from '../../utils/showToast';
import getLoginStatus from '../../utils/getLoginStatus';
import useUserInfo from '../../querys/useUserInfo';
import LightIcon from '../../assets/icons/LightIcon';
import DarkIcon from '../../assets/icons/DarkIcon';

const UserSettingContainer = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${cssToken.WIDTH['min-w-full']};
  height: ${cssToken.HEIGHT['h-screen']};
  background-color: ${cssToken.COLOR['gray-300']};
`;

const SettingBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.9375rem;
  width: 37.5rem;
  height: 37.5rem;
  background-color: ${cssToken.COLOR.white};
  flex-direction: column;
  gap: ${cssToken.SPACING['gap-50']};
  position: relative;

  @media (max-width: 768px) {
    width: ${cssToken.WIDTH['min-w-full']};
    height: ${cssToken.HEIGHT['h-screen']};
    border-radius: 0;
  }
`;

const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${cssToken.SPACING['gap-20']};

  > button {
    background: #d3d3d3;
  }
  @media (max-width: 768px) {
    > div {
      width: 9rem;
      height: 9rem;
    }
  }
`;

const SettingListUl = styled.ul`
  border-top: 1px solid #dcdcdc;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SettingList = styled.li`
  width: ${cssToken.WIDTH['min-w-full']};
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${cssToken.COLOR['gray-600']};
  padding: ${cssToken.SPACING['gap-20']};
  justify-content: center;
  height: 5rem;
  gap: 0.625rem;

  span {
    flex: 1;
    font-size: ${cssToken.TEXT_SIZE['text-16']};
  }

  @media (max-width: 768px) {
    padding: 0.25rem;
    span {
      font-size: 0.8125rem;
    }
  }
`;

const TopContain = styled.div`
  position: absolute;
  right: 1.875rem;
  top: 1.875rem;
`;

const Button = styled.button`
  font-size: ${cssToken.TEXT_SIZE['text-14']};
  color: #999;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 0.8125rem;
  }
`;

const BtnBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  @media (max-width: 768px) {
    flex: 2;
  }
`;

const IconButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.4375rem;
  border-radius: ${cssToken.BORDER['rounded-s']};
  background-color: ${cssToken.COLOR['gray-300']};

  &.active {
    background-color: ${cssToken.COLOR['point-100']};
    > svg path {
      fill: ${cssToken.COLOR['point-500']};
    }
  }
`;

const UserSetting = () => {
  const LogoutoggleModal = useLogioutoggleModal();
  const toggleModal = useToggleModal();
  const gotoMain = useMovePage('/');
  const navigate = useNavigate();
  const gotoBack = () => {
    navigate(-1);
  };
  const { userData } = useUserInfo(getLoginStatus());
  const modalIsOpen = useSelector((state: RootState) => state.overlay.isOpen);

  const ThemMode = useSelector((state: RootState) => state.themeMode.themeMode);

  const mutation = useMutation(DeleteAccount, {
    onSuccess() {
      toggleModal();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('isLogin');
      gotoMain();
    },
    onError(error) {
      throw error;
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  // const handleTheme = (theme: string) => {
  //   dispatch(setThemeModeActions.setThemeMode(theme));
  //   showToast('default', '서비스 준비중!')();
  // };

  const handlePreparing = () => {
    showToast('default', '서비스 준비중!')();
  };

  return (
    <UserSettingContainer>
      {modalIsOpen && (
        <Modal
          className={['modal', 'modalContainer']}
          styles={{
            width: '25rem',
            height: '15rem',
            borderradius: `${cssToken.BORDER['rounded-s']}`,
          }}
        >
          <ModalChildren
            leftBtnCallback={(e) => {
              e.stopPropagation();
              handleLogout();
            }}
            rightBtnCallback={(e) => {
              e.stopPropagation();
              toggleModal();
            }}
            content="정말 회원 탈퇴 하시겠습니까?"
          />
        </Modal>
      )}
      <SettingBox>
        <TopContain>
          <CloseButton onClick={gotoBack} />
        </TopContain>
        <ImgBox>
          <UserInfoMy
            styles={{
              size: '10.75rem',
            }}
            src={userData?.memberImageUrl}
          />
          <SkyBlueEventButton
            onClick={handlePreparing}
            width="150px"
            height="40px"
            brradius={`${cssToken.BORDER['rounded-tag']}`}
            fontsize={`${cssToken.TEXT_SIZE['text-14']}`}
          >
            이미지 변경
          </SkyBlueEventButton>
        </ImgBox>
        <SettingListUl>
          <SettingList>
            <span>화면 테마 설정</span>
            <BtnBox className="IconBtn">
              <IconButton
                className={ThemMode === 'light' ? 'active' : ''}
                onClick={handlePreparing}
                // onClick={() => handleTheme('light')}
              >
                <LightIcon />
              </IconButton>
              <IconButton
                className={ThemMode === 'dark' ? 'active' : ''}
                onClick={handlePreparing}
                // onClick={() => handleTheme('dark')}
              >
                <DarkIcon />
              </IconButton>
            </BtnBox>
          </SettingList>
          <SettingList>
            <span>계정관리</span>
            <BtnBox>
              <Button onClick={LogoutoggleModal}>로그아웃</Button>
              <Button onClick={() => toggleModal()}>회원탈퇴</Button>
            </BtnBox>
          </SettingList>
        </SettingListUl>
      </SettingBox>
    </UserSettingContainer>
  );
};

export default UserSetting;
