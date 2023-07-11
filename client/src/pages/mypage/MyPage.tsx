import { styled } from 'styled-components';

import { FlexDiv } from '../../styles/styles';
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
  return (
    <Wrapper>
      <UserInfoBox />
    </Wrapper>
  );
};

export default MyPage;
