import { styled } from 'styled-components';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import cssToken from '../../styles/cssToken';
import { FlexDiv } from '../../styles/styles';
import UserInfoMy from '../../components/ui/UserInfoPfp';
import FilterSection from '../../components/community/FilterSection';
import FilterTab from '../../components/community/FilterTab';
import { GetUserInfo, GetMyList, PatchMemNickname } from '../../apis/api';
import { setUserOAuthActions } from '../../store/userAuth-slice';
import Pen from '../../assets/Pen';
import SkyBlueButton from '../../components/ui/button/SkyBlueButton';

const Wrapper = styled(FlexDiv)`
  margin-top: 77px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 6.5rem;
  row-gap: 7.75rem;
`;

const Div = styled.div`
  margin-bottom: 0.25rem;
`;

const FixedDiv = styled.article`
  position: fixed;
  right: ${cssToken.SPACING['gap-40']};
  bottom: ${cssToken.SPACING['gap-40']};
`;

const UserInfoContainer = styled.section`
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

const WriteBtn = styled.button`
  cursor: pointer;
`;

const ScheduleLink = styled(Link)`
  text-decoration: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 0.95rem 0.95rem;
  white-space: nowrap;
  transition: ${cssToken.TRANSITION.basic};
  font-size: 14px;
  background: ${cssToken.COLOR['point-900']};
  height: 25px;
  border-radius: ${cssToken.BORDER['rounded-tag']};
  color: ${cssToken.COLOR.white};
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const MyPage = () => {
  const [toggleNickname, setToggleNickname] = useState<boolean>(false);
  const memNicknameRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const memNickname = useSelector(
    (state: RootState) => state.userAuth.nickName
  );

  const userAuthInfo = useSelector(
    (state: RootState) => state.userAuth.userInfo
  );

  const mutation = useMutation(PatchMemNickname, {
    onSuccess: () => {
      dispatch(setUserOAuthActions.paintMemNickname(memNickname));
    },
    onError: (error) => {
      navigate(`/error/${error.status as string}`);
    },
  });

  const { data: userMemData } = useQuery(['userInof'], () => GetMyList());

  const handleOpenNickname = () => {
    setToggleNickname(!toggleNickname);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserOAuthActions.paintMemNickname(e.target.value));
  };

  const paintNickname = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(memNickname);
    setToggleNickname(!toggleNickname);
  };

  useEffect(() => {
    memNicknameRef.current = memNickname;
  });

  return (
    <Wrapper>
      <UserInfoContainer>
        <UserInfoMy
          styles={{
            size: '10.75rem',
          }}
          src={userAuthInfo?.memberImageUrl}
        />
        <RightWrap>
          <UserNicknameBox>
            {!toggleNickname ? (
              <>
                <UserNickname>
                  {memNicknameRef.current
                    ? memNicknameRef.current
                    : userAuthInfo?.memberNickname}
                </UserNickname>
                <WriteBtn onClick={handleOpenNickname}>
                  <Pen
                    style={{
                      iconWidth: '20px',
                      iconHeight: '20px',
                      color: '#000',
                    }}
                  />
                </WriteBtn>
              </>
            ) : (
              <form onSubmit={paintNickname}>
                <input
                  type="text"
                  defaultValue={
                    memNicknameRef.current
                      ? memNicknameRef.current
                      : userAuthInfo?.memberNickname
                  }
                  onChange={handleChange}
                  ref={memNicknameRef}
                />
                <WriteBtn>
                  <Pen
                    style={{
                      iconWidth: '20px',
                      iconHeight: '20px',
                      color: '#000',
                    }}
                  />
                </WriteBtn>
              </form>
            )}
          </UserNicknameBox>
          <ScheduleLink to="/register">일정 등록</ScheduleLink>
        </RightWrap>
      </UserInfoContainer>

      <FilterSection>
        <FilterTab content="일정" tab="Newest" />
        <FilterTab content="즐겨찾기" tab="Like" />
      </FilterSection>
    </Wrapper>
  );
};

export default MyPage;
