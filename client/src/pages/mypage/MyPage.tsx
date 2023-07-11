import { styled } from 'styled-components';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import cssToken from '../../styles/cssToken';
import { FlexDiv } from '../../styles/styles';
import UserInfoMy from '../../components/ui/UserInfoPfp';
import { GetMyList, PatchMemNickname } from '../../apis/api';
import { setUserOAuthActions } from '../../store/userAuth-slice';
import Pen from '../../assets/Pen';
import ContensCard from '../../components/ui/cards/ContentsCard';
import InputContainer from '../../components/ui/input/InputContainer';
import Text from '../../components/ui/text/Text';


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

const WriteBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
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
  flex: 1;
`;

const InputBox = styled.input`
  border: solid 1px #dcdcdc;
  padding: 0.3125rem 0.5rem;
  font-size: ${(props) => props.size || '16px'};
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;

const FormBox = styled.form`
  display: flex;
`;

const MyPage = () => {
  const [toggleNickname, setToggleNickname] = useState<boolean>(false);
  const [isName, setIsName] = useState<boolean>(false);
  const memNicknameRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const memNickname = useSelector(
    (state: RootState) => state.userAuth.nickName
  );

  const userAuthInfo = useSelector(
    (state: RootState) => state.userAuth.userInfo
  );

  const { data: userInfoData } = useQuery({
    queryKey: ['userInf'],
    queryFn: () => GetMyList(),
    onError: (error: AxiosError) => {
      navigate(`/error/${error.status as string}`);
    },
  });

  const memberCourseList = userInfoData?.data?.memberCourseList[0];
  const memberBookmarkedList = userInfoData?.data?.memberBookmarkedList;

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
    if (memNicknameRef.current.length < 2 || memNicknameRef.current.length > 10) {

    } else {
      e.preventDefault();
      mutation.mutate(memNickname);
      setToggleNickname(!toggleNickname);
    }
  };

  useEffect(() => {
    memNicknameRef.current = memNickname;
  });

  return (
    <Wrapper>
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
                <WriteBtn onClick={handleOpenNickname}>
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
                    memNicknameRef.current
                      ? memNicknameRef.current
                      : userAuthInfo?.memberNickname
                  }
                  onChange={onChangeName}
                  ref={memNicknameRef}
                  isValidate={isName}
                />
                <WriteBtn>
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
          <ScheduleLink to="/register">일정 등록</ScheduleLink>
        </RightWrap>
      </UserInfoContainer>


      <section>
        {/* title=""
          text=""
          likeCount=""
          tag=""
          userName=""
          thumbnail=""
          onClick=""
          selectId=""
          postId=""
          courseId=""
          children=""
          likeStatus=""
          bookmarkStatus=""
          type=""
          date="" */}
        {/* {
          memberCourseList.map((el, idx) => (
            <ContensCard
              key={idx}
              title={el.courseTitle}

            />
          ))
        } */}
        <ContensCard
        />
      </section>
    </Wrapper>
  );
};

export default MyPage;
