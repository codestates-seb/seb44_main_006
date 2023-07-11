
import { styled } from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import cssToken from '../../styles/cssToken';
import UserInfoMy from '../ui/UserInfoPfp';
import { PatchMemNickname } from '../../apis/api';
import { setUserOAuthActions } from '../../store/userAuth-slice';
import Pen from '../../assets/Pen';
import InputContainer from '../ui/input/InputContainer';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import useMovePage from '../../hooks/useMovePage';

interface isNickNameT {
  isValidate?: boolean;
  toggleNickname?: boolean;
  size?: number;
};

const UserInfoContainer = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
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

const WriteBtn = styled.button<isNickNameT>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: ${(props) =>
    props.toggleNickname ? 'absolute' : 'unset'};
  top: ${(props) =>
    props.toggleNickname ? (props.isValidate ? '45%' : '35%') : 'unset'};
  right: ${(props) =>
    props.toggleNickname ? '0.3125rem' : 'unset'};
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
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;

const FormBox = styled.form<isNickNameT>`
  display: flex;
  flex-direction: ${(props) => (props.isValidate ? 'row' : 'column')};
  position: relative;
`;

const UserInfoBox = () => {
  const [toggleNickname, setToggleNickname] = useState<boolean>(false);
  const [isName, setIsName] = useState<boolean>(true);
  const memNicknameRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const gotoRegister = useMovePage('/register');
  const memNickname = useSelector(
    (state: RootState) => state.userAuth.nickName
  );

  const userAuthInfo = useSelector(
    (state: RootState) => state.userAuth.userInfo
  );

  const mutation = useMutation(PatchMemNickname, {
    onSuccess: () => {
      dispatch(setUserOAuthActions.paintMemNickname(memNicknameRef.current));
    },
    onError: (error) => {
      navigate(`/ error / ${error.status as string}`);
    },
  });

  const handleOpenNickname = () => {
    setToggleNickname(!toggleNickname);
  };

  const onChangeName = ((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserOAuthActions.paintMemNickname(e.target.value));
    if (e.target.value.length < 2 || e.target.value.length > 10) {
      setIsName(false);
    } else {
      setIsName(true);
    }
  });

  const paintNickname = (e: React.FormEvent<HTMLFormElement>) => {
    if (isName) {
      e.preventDefault();
      mutation.mutate(memNickname);
      setToggleNickname(!toggleNickname);
    }
  };

  useEffect(() => {
    memNicknameRef.current = memNickname;
  });

  return (
    <UserInfoContainer>
      <ImgBox>
        <UserInfoMy
          styles={{
            size: '10.75rem',
          }}
          src={userAuthInfo?.memberImageUrl}
        />
      </ImgBox>
      <RightWrap>
        <UserNicknameBox>
          {!toggleNickname ? (
            <>
              <UserNickname>
                {memNicknameRef.current
                  ? memNicknameRef.current
                  : userAuthInfo?.memberNickname}
              </UserNickname>
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
                required
                type="title"
                minLength={1}
                maxLength={10}
                defaultValue={
                  memNicknameRef?.current
                    ? memNicknameRef?.current
                    : userAuthInfo?.memberNickname
                }
                onChange={onChangeName}
                ref={memNicknameRef}
                isValidate={isName}
                styles={{
                  width: "100%"
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
          borderRadius={`${cssToken.BORDER['rounded-tag']}`}
        >
          일정 등록
        </SkyBlueButton>
      </RightWrap>
    </UserInfoContainer>
  )
};

export default UserInfoBox;
