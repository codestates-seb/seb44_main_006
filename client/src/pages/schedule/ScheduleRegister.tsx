import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Suspense, lazy, useEffect, useState } from 'react';

import { IScheduleListItem, PlacesSearchResultItem } from '../../types/type';
import { RootState } from '../../store';
import ScheduleBox from '../../components/schedule/Schedulebox';
import cssToken from '../../styles/cssToken';
import { MarkerOff } from '../../components/map/index';
import CircleButton from '../../components/ui/button/CircleButton';
import SaveIcon from '../../assets/SaveIcon';
import CloseIcon from '../../assets/CloseIcon';
import ScheduleCreateModal from '../../components/schedule/ScheduleCreateModal';
import { overlayActions } from '../../store/overlay-slice';
import Polyline from '../../components/map/Polyline';
import makePolyline from '../../utils/makePolyline';
import ScheduleCancelModal from '../../components/schedule/ScheduleCancelModal';
import RegisterDetail from '../../components/register/RegisterDetail';
import { placeListActions } from '../../store/placeList-slice';
import BottomSheet from '../../components/ui/bottomsheet/BottomSheet';

const KakaoMap = lazy(() => import('../../components/map/KakaoMap'));
const Marker = lazy(() => import('../../components/map/Marker'));

const Wrapper = styled.div`
  width: ${cssToken.WIDTH['w-screen']};
  height: ${cssToken.HEIGHT['h-screen']};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const FixedDiv = styled.div`
  height: 15rem;
  display: flex;
  flex-direction: column;
  gap: ${cssToken.SPACING['gap-16']};
  position: fixed;
  right: ${cssToken.SPACING['gap-40']};
  bottom: ${cssToken.SPACING['gap-40']};
  z-index: 999;

  @media (max-width: 480px) {
    flex-direction: row;
    right: ${cssToken.SPACING['gap-16']};
    top: ${cssToken.SPACING['gap-16']};
  }
`;

const ButtonDiv = styled.div`
  margin-bottom: 0.25rem;
`;

const RelativeDiv = styled.div`
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const ScheduleRegister = () => {
  const [isCancel, setIsCancel] = useState<boolean>(false);

  const isSave = useSelector((state: RootState) => state.overlay.isOpen);
  const places = useSelector((state: RootState) => state.placeList.list);
  const isEmpty = useSelector((state: RootState) => state.placeList.isEmpty);
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

  useEffect(() => {
    if (isEmpty) dispatch(placeListActions.resetList());
  }, [dispatch, isEmpty]);

  return (
    <Wrapper>
      {isSave && <ScheduleCreateModal />}
      {isCancel && <ScheduleCancelModal setIsCancel={setIsCancel} />}

      {/* <RelativeDiv>
          <ScheduleBox />
          {isDetailShow && <RegisterDetail detailItem={detailItem} />}
        </RelativeDiv> */}

      <BottomSheet>
        <RelativeDiv>
          <ScheduleBox />
          {isDetailShow && <RegisterDetail detailItem={detailItem} />}
        </RelativeDiv>
      </BottomSheet>

      <Suspense>
        <KakaoMap width="100vw" height="100vh">
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
        <CircleButton width="100px" height="100px" onClick={handleCancel}>
          <ButtonDiv>
            <CloseIcon
              style={{ iconWidth: 19, iconHeight: 19, color: 'black' }}
            />
          </ButtonDiv>
          <div>취소하기</div>
        </CircleButton>
        <CircleButton
          width="100px"
          height="100px"
          onClick={() => {
            if (scheduleList.length > 0)
              dispatch(overlayActions.toggleOverlay());
          }}
        >
          <ButtonDiv>
            <SaveIcon
              style={{ iconWidth: 22, iconHeight: 22, color: 'black' }}
            />
          </ButtonDiv>
          <div>저장하기</div>
        </CircleButton>
      </FixedDiv>
    </Wrapper>
  );
};

export default ScheduleRegister;
