import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { IScheduleListItem, PlacesSearchResultItem } from '../../types/type';
import { RootState } from '../../store';
import cssToken from '../../styles/cssToken';
import { MarkerOff } from '../../components/map/index';
import ScheduleCreateModal from '../../components/schedule/ScheduleCreateModal';
import { overlayActions } from '../../store/overlay-slice';
import Polyline from '../../components/map/Polyline';
import makePolyline from '../../utils/makePolyline';
import ScheduleCancelModal from '../../components/schedule/ScheduleCancelModal';
import RegisterDetail from '../../components/register/RegisterDetail';
import { placeListActions } from '../../store/placeList-slice';
import BottomSheet from '../../components/ui/bottomsheet/BottomSheet';
import { selectedIdActions } from '../../store/selectedId-slice';
import useValidEnter from '../../hooks/useValidEnter';
import panTo from '../../utils/panTo';
import useModifyCheck from '../../hooks/useModifyCheck';
import { GetCourse } from '../../apis/api';
import { PostReadT } from '../../types/apitype';
import { scheduleListActions } from '../../store/scheduleList-slice';
import ScheduleBox from '../../components/schedule/ScheduleBox';
import { markerActions } from '../../store/marker-slice';

const KakaoMap = lazy(() => import('../../components/map/KakaoMap'));
const Marker = lazy(() => import('../../components/map/Marker'));

const Wrapper = styled.div`
  width: ${cssToken.WIDTH['w-screen']};
  height: ${cssToken.HEIGHT['h-screen']};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FixedDiv = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  gap: ${cssToken.SPACING['gap-12']};
  top: ${cssToken.SPACING['gap-12']};
  right: ${cssToken.SPACING['gap-12']};
  z-index: 999;
`;

const FloatButton = styled.button<{ bgcolor: string; fontcolor?: string }>`
  font-weight: ${cssToken.FONT_WEIGHT.bold};
  width: 8rem;
  height: 3rem;
  border-radius: ${cssToken.BORDER['rounded-s']};
  color: ${(props) => props.fontcolor};
  background-color: ${(props) => props.bgcolor};
  box-shadow: ${cssToken.SHADOW['shadow-4xl']};
  cursor: pointer;

  @media (max-width: 768px) {
    font-weight: ${cssToken.FONT_WEIGHT.medium};
    font-size: 0.8rem;
    width: 5rem;
    height: 2rem;
  }
`;

const ScheduleRegister = () => {
  const checkValidEnter = useValidEnter();
  const { isModify, courseId } = useModifyCheck();

  const [isCancel, setIsCancel] = useState<boolean>(false);

  const isSave = useSelector((state: RootState) => state.overlay.isOpen);
  const places = useSelector((state: RootState) => state.placeList.list);
  const isEmpty = useSelector((state: RootState) => state.placeList.isEmpty);
  const newCenter = useSelector((state: RootState) => state.marker.center);
  const map = useSelector((state: RootState) => state.map.map);
  const scheduleList = useSelector(
    (state: RootState) => state.scheduleList.list
  );
  const isDetailShow = useSelector(
    (state: RootState) => state.showDetail.isShow
  );
  const detailItem = useSelector((state: RootState) => state.showDetail.item);

  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsCancel(true);
  };

  const updateDestinationList = async () => {
    const response = await GetCourse({
      courseId,
    });
    const { courseData, destinationList } = response.data as PostReadT;
    dispatch(scheduleListActions.updateList(destinationList));

    return { courseData, destinationList };
  };

  const { data: modifyData } = useQuery({
    queryKey: ['modify'],
    queryFn: updateDestinationList,
    refetchOnWindowFocus: false,
    enabled: isModify,
  });

  useEffect(() => {
    checkValidEnter(); // 로그인 상태 아닐 때 url을 직접 검색해서 들어오면 메인으로 돌려보냄
    return () => {
      dispatch(markerActions.reset());
    };
  }, [checkValidEnter, dispatch]);

  useEffect(() => {
    if (map && newCenter.lat && newCenter.lng) {
      panTo({ map, newCenter });
    }
  }, [map, newCenter]);

  useEffect(() => {
    if (isModify && modifyData?.destinationList) {
      panTo({
        map,
        newCenter: { lat: modifyData?.destinationList[0].y, lng: modifyData?.destinationList[0].x },
      });
    }
  }, [isModify, map, modifyData?.destinationList]);

  useEffect(() => {
    if (isEmpty) dispatch(placeListActions.resetList());
    dispatch(selectedIdActions.allReset());
  }, [dispatch, isEmpty]);

  return (
    <Wrapper>
      {isSave && (
        <ScheduleCreateModal ismodify={isModify} courseId={courseId} courseData={modifyData?.courseData} />
      )}
      {isCancel && <ScheduleCancelModal setIsCancel={setIsCancel} />}

      <BottomSheet>
        <ScheduleBox ismodify={isModify} />
        {isDetailShow && <RegisterDetail detailItem={detailItem} />}
      </BottomSheet>
      <Suspense>
        <KakaoMap
          width={cssToken.WIDTH['w-screen']}
          height={cssToken.HEIGHT['h-screen']}
        >
          {places.map((place: PlacesSearchResultItem) => (
            <Marker
              img={MarkerOff[0]}
              key={place.id}
              lat={place.y}
              lng={place.x}
              id={place.id}
            />
          ))}
          {scheduleList.map((place: IScheduleListItem, idx: number) => (
            <Marker
              key={place.id}
              lat={place.y}
              lng={place.x}
              id={place.id}
              idx={idx}
            />
          ))}
          <Polyline linePos={makePolyline(scheduleList)} />
        </KakaoMap>
      </Suspense>

      <FixedDiv>
        <FloatButton
          bgcolor={cssToken.COLOR['gray-300']}
          fontcolor={cssToken.COLOR.black}
          onClick={handleCancel}
        >
          <div>취소하기</div>
        </FloatButton>
        <FloatButton
          bgcolor={cssToken.COLOR['point-900']}
          fontcolor={cssToken.COLOR.white}
          onClick={() => {
            if (scheduleList.length > 0)
              dispatch(overlayActions.toggleOverlay());
          }}
        >
          <div>{isModify ? '수정하기' : '저장하기'}</div>
        </FloatButton>
      </FixedDiv>
    </Wrapper>
  );
};

export default ScheduleRegister;
