import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import cssToken from '../../styles/cssToken';
import { FlexDiv } from '../../styles/styles';
import UserInfoMy from '../../components/ui/UserInfoPfp';
import FilterSection from '../../components/community/FilterSection';
import FilterTab from '../../components/community/FilterTab';
import { GetUserInfo, GetMyList } from '../../apis/api';
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
  height:25px;
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
  const userAuthInfo = useSelector(
    (state: RootState): boolean => state.userAuth.userInfo
  );

  const { data: userMemData } = useQuery(
    ['userInof'],
    () => GetMyList(),
  );

  const memberBookmarkedList = userMemData.data.memberBookmarkedList;
  const memberCourseList = userMemData.data.memberCourseList;

  console.log(userAuthInfo);
  console.log(userMemData.data.memberBookmarkedList);
  console.log(userMemData.data.memberCourseList);

  return (
    <Wrapper>
      <UserInfoContainer>
        <UserInfoMy
          styles={{
            size: '10.75rem',
          }}
          src={userAuthInfo.memberImageUrl}
        />
        <RightWrap>
          <UserNicknameBox>
            <UserNickname>{userAuthInfo.memberNickname}</UserNickname>
            <WriteBtn>
              <Pen style={{
                iconWidth: '20px',
                iconHeight: '20px',
                color: '#000',
              }}
              />
            </WriteBtn>
          </UserNicknameBox>
          <ScheduleLink to="/register">
            일정 등록
          </ScheduleLink>
        </RightWrap>
      </UserInfoContainer>

      <FilterSection>
        <FilterTab content="일정" tab="Newest" />
        <FilterTab content="즐겨찾기" tab="Like" />
      </FilterSection>
    </Wrapper>
  )
};

export default MyPage;
