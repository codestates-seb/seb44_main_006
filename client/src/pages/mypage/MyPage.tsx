import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import cssToken from '../../styles/cssToken';
import { FlexDiv } from '../../styles/styles';
import { GetMyList } from '../../apis/api';
import UserInfoBox from '../../components/mypage/UserInfoBox';
import FilterSection from '../../components/mypage/FilterSection';
import FilterTab from '../../components/mypage/FilterTab';
import useHandleTab from '../../hooks/useHandleTab';
import { myInfoDataListActions } from '../../store/myInfoDataList-slice';
import { RootState } from '../../store';
import { MypSummaryT } from '../../types/apitype';
import useValidEnter from '../../hooks/useValidEnter';
import getLoginStatus from '../../utils/getLoginStatus';
import useMovePage from '../../hooks/useMovePage';
import CircleButton from '../../components/ui/button/CircleButton';
import scrollToTop from '../../utils/scrollToTop';
import Pen from '../../assets/icons/Pen';

const Wrapper = styled(FlexDiv)`
  margin-top: 77px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  row-gap: 7.75rem;
  @media (max-width: 768px) {
    margin-top: 50px;
    padding-top: 0;
    row-gap: 5.75rem;
  }
`;

const Div = styled.div`
  margin-bottom: 0.25rem;
`;

const FixedDiv = styled.div`
  position: fixed;
  right: ${cssToken.SPACING['gap-40']};
  bottom: ${cssToken.SPACING['gap-40']};
  z-index: 1;

  @media screen and (max-width: 768px) {
    right: 1rem;
    bottom: 5.5rem;
  }
`;

const MyPage = () => {
  const checkValidEnter = useValidEnter();
  const dispatch = useDispatch();
  const goToSelect = useMovePage('/community/select', 'mypage');
  const { selectTab, setTab } = useHandleTab();
  const isLogin = getLoginStatus();
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

  useEffect(() => {
    checkValidEnter();
    scrollToTop();
  }, [checkValidEnter]);

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
      {isLogin && (
        <FixedDiv onClick={goToSelect}>
          <CircleButton width="117px" height="117px">
            <Div>
              <Pen style={{ iconWidth: 28, iconHeight: 28, color: 'black' }} />
            </Div>
            <div>자랑하기</div>
          </CircleButton>
        </FixedDiv>
      )}
    </Wrapper>
  );
};

export default MyPage;
