import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import cssToken from '../../styles/cssToken';
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

const FixedDiv = styled.article`
  position: fixed;
  right: ${cssToken.SPACING['gap-40']};
  bottom: ${cssToken.SPACING['gap-40']};
`;

const MyPage = () => {
  const [memNickname, setMemNickname] = useState('');
  const userAuthInfo = useSelector(
    (state: RootState): boolean => state.userAuth.userInfo
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
