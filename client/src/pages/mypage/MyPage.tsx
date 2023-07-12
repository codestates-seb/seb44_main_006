import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import { FlexDiv } from '../../styles/styles';
import { GetMyList } from '../../apis/api';
import UserInfoBox from '../../components/mypage/UserInfoBox';
import FilterSection from '../../components/mypage/FilterSection';
import FilterTab from '../../components/mypage/FilterTab';
import useHandleTab from '../../hooks/useHandleTab';
import useUserInfo from '../../hooks/useUserInfo';

const Wrapper = styled(FlexDiv)`
  margin-top: 77px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 6.5rem;
  row-gap: 7.75rem;
`;

const MyPage = () => {
  const { selectTab, setTab } = useHandleTab();
  const { data: userMemData } = useQuery(['userInfo'], () => GetMyList());

  return (
    <Wrapper>
      <UserInfoBox />
      <FilterSection
        memberBookmarkedList={userMemData?.data?.memberBookmarkedList}
        memberCourseList={userMemData?.data?.memberCourseList}
        selectTab={selectTab}
      >
        <FilterTab
          content="일정"
          selectTab={selectTab}
          tab="First"
          onClick={setTab}
        />
        <FilterTab
          content="즐겨찾기"
          selectTab={selectTab}
          tab="Second"
          onClick={setTab}
        />
      </FilterSection>
    </Wrapper>
  );
};

export default MyPage;
