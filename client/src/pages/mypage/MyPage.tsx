import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import { FlexDiv } from '../../styles/styles';
import { GetMyList } from '../../apis/api';
import UserInfoBox from '../../components/mypage/UserInfoBox';
import FilterSection from '../../components/mypage/FilterSection';
import FilterTab from '../../components/mypage/FilterTab';
import useHandleTab from '../../hooks/useHandleTab';
import { myInfoDataListActions } from '../../store/myInfoDataList-slice';
import { RootState } from '../../store';
import { MypSummaryT } from '../../types/apitype';

const Wrapper = styled(FlexDiv)`
  margin-top: 77px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 6.5rem;
  row-gap: 7.75rem;
`;

const MyPage = () => {
  const dispatch = useDispatch();
  const { selectTab, setTab } = useHandleTab();
  useQuery({
    queryKey: ['mypage'],
    queryFn: () => GetMyList(),
    onSuccess: (data: { data: MypSummaryT }) => {
      if (data) {
        dispatch(
          myInfoDataListActions.setDataCourse(data.data.memberCourseList)
        );
        dispatch(
          myInfoDataListActions.setDataBookMark(data.data.memberBookmarkedList)
        );
      }
    },
  });

  const memberCourseList = useSelector(
    (state: RootState) => state.myInfoData.memberCourseList
  );
  const memberBookmarkedList = useSelector(
    (state: RootState) => state.myInfoData.memberBookmarkedList
  );

  return (
    <Wrapper>
      <UserInfoBox />
      <FilterSection
        memberBookmarkedList={memberBookmarkedList}
        memberCourseList={memberCourseList}
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
