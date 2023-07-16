import { styled } from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import cssToken from '../../styles/cssToken';
import UserInfoMy from '../ui/UserInfoPfp';
import { PatchMemNickname } from '../../apis/api';
import { setUserOAuthActions } from '../../store/userAuth-slice';
import Pen from '../../assets/Pen';
import InputContainer from '../ui/input/InputContainer';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import useMovePage from '../../hooks/useMovePage';
import SettingIcon from '../../assets/SettingIcon';
import useUserInfo from '../../querys/useUserInfo';
import SkeletonUserInfoContainer from '../skeleton/SkeletonUserInfo';

interface IsNickNameT {
  toggleNickname?: boolean;
  isValidate?: boolean;
}

const UserInfoContainer = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const UserNicknameBox = styled.div`
  display: flex;
  align-items: center;
`;

const UserNickname = styled.p`
  font-weight: 700;
  font-size: 30px;
`;

const WriteBtn = styled.button<IsNickNameT>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: ${(props) => (props.toggleNickname ? 'absolute' : 'unset')};
  top: ${(props) => {
    if (props.toggleNickname) {
      return props.isValidate ? '45%' : '35%';
    }
    return 'unset';
  }};
  right: ${(props) => (props.toggleNickname ? '0.3125rem' : 'unset')};
  transform: ${(props) =>
    props.toggleNickname ? 'translate(0, -50%)' : 'unset'};
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1;

  > button {
    align-items: center;
    justify-content: center;
    padding: 1.1rem 0.98rem 0.98rem;
    font-size: 14px;
  }
`;

const ImgBox = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;

const SettingButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 3.125rem;
  border: 1px solid ${cssToken.COLOR['gray-600']};
  background-color: ${cssToken.COLOR.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const FormBox = styled.form<IsNickNameT>`
  display: flex;
  flex-direction: ${(props) => (props.isValidate ? 'row' : 'column')};
  position: relative;
`;

const UserInfoBox = () => {
  const { userData } = useUserInfo();
  const [toggleNickname, setToggleNickname] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('');
  const [isName, setIsName] = useState<boolean>(true);
  const memNicknameRef = useRef<HTMLInputElement>(null);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const gotoRegister = useMovePage('/register');
  const gotoSetting = useMovePage('/setting');
  const queryClient = useQueryClient();

  const mutation = useMutation(PatchMemNickname, {
    onSuccess: () => {
      return queryClient.invalidateQueries(['user']);
    },
    onError: (error) => {
      const { response } = error as AxiosError;
      if (response) navigator(`/error/${response.status}`);
    },
  });

  useEffect(() => {
    if (toggleNickname && memNicknameRef.current && userData) {
      memNicknameRef.current.focus();
      memNicknameRef.current.value = userData.memberNickname;
    }
  }, [toggleNickname, userData]);

  const handleOpenNickname = () => {
    setToggleNickname(!toggleNickname);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserOAuthActions.paintMemNickname(e.target.value));
    if (e.target.value.length < 2 || e.target.value.length > 10) {
      setIsName(false);
      setErrMsg('글자 수를 만족하지 못했습니다.');
    } else if (e.target.value.includes('탈퇴한 사용자')) {
      setIsName(false);
      setErrMsg('사용할 수 없는 닉네임입니다.');
    } else {
      setIsName(true);
    }
  };

  const paintNickname = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (memNicknameRef.current) {
      const nickName = memNicknameRef.current.value;

      if (isName && userData && nickName !== userData.memberNickname) {
        mutation.mutate(nickName);
      }
    }
    setToggleNickname(!toggleNickname);
  };

  return (
    <UserInfoContainer>
      {userData && userData ? (
        <>
          <ImgBox>
            <UserInfoMy
              styles={{
                size: '10.75rem',
              }}
              src={userData?.memberImageUrl}
            />
            <SettingButton onClick={gotoSetting}>
              <SettingIcon />
            </SettingButton>
          </ImgBox>
          <RightWrap>
            <UserNicknameBox>
              {!toggleNickname && userData ? (
                <>
                  <UserNickname>{userData?.memberNickname}</UserNickname>
                  <WriteBtn
                    toggleNickname={toggleNickname}
                    onClick={handleOpenNickname}
                  >
                    <Pen
                      style={{
                        iconWidth: 20,
                        iconHeight: 20,
                        color: '#000',
                      }}
                    />
                  </WriteBtn>
                </>
              ) : (
                <FormBox onSubmit={paintNickname}>
                  <InputContainer
                    type="title"
                    textType="nickName"
                    text={errMsg}
                    minLength={2}
                    maxLength={10}
                    onChange={onChangeName}
                    ref={memNicknameRef}
                    isValidate={isName}
                    styles={{
                      width: '100%',
                    }}
                  />
                  <WriteBtn isValidate={isName} toggleNickname={toggleNickname}>
                    <Pen
                      style={{
                        iconWidth: 20,
                        iconHeight: 20,
                        color: '#000',
                      }}
                    />
                  </WriteBtn>
                </FormBox>
              )}
            </UserNicknameBox>
            <SkyBlueButton
              onClick={gotoRegister}
              height="25px"
              brradius={`${cssToken.BORDER['rounded-tag']}`}
              disabled={userData && userData?.myCourseCount > 30}
            >
              일정 등록
            </SkyBlueButton>
          </RightWrap>
        </>
      ) : (
        <SkeletonUserInfoContainer />
      )}
    </UserInfoContainer>
  );
};

export default UserInfoBox;
