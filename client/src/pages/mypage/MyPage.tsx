import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
// import cssToken from '../../styles/cssToken';
import { FlexDiv } from '../../styles/styles';
import { GetMyList } from '../../apis/api';
import UserInfoBox from '../../components/mypage/UserInfoBox';

const Wrapper = styled(FlexDiv)`
  margin-top: 77px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 6.5rem;
  row-gap: 7.75rem;
`;

const MyPage = () => {
  const userAuthInfo = useSelector(
    (state: RootState) => state.userAuth.userInfo
  );

  const { data: userMemData } = useQuery(['userInof'], () => GetMyList());

  console.log(userAuthInfo);
  console.log(userMemData);
  return (
    <Wrapper>
      <UserInfoBox />
    </Wrapper>
  );
};

export default MyPage;
