import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useState } from 'react';

import KakaoMap from '../../components/map/KakaoMap';
import Marker from '../../components/map/Marker';
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

const Wrapper = styled.div`
  width: ${cssToken.WIDTH['w-screen']};
  height: ${cssToken.HEIGHT['h-screen']};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FixedDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssToken.SPACING['gap-16']};
  position: fixed;
  right: ${cssToken.SPACING['gap-40']};
  bottom: ${cssToken.SPACING['gap-40']};
  z-index: 999;
`;

const ButtonDiv = styled.div`
  margin-bottom: 0.25rem;
`;

const ScheduleRegister = () => {
  const isSave = useSelector((state: RootState) => state.overlay.isOpen);
  const places = useSelector((state: RootState) => state.placeList.list);
  const scheduleList = useSelector(
    (state: RootState) => state.scheduleList.list
  );
  const dispatch = useDispatch();

  const [isCancel, setIsCancel] = useState<boolean>(false);

  const handleCancel = () => {
    setIsCancel(true);
  };

  return (
    <Wrapper>
      {isSave && <ScheduleCreateModal />}
      {isCancel && <ScheduleCancelModal setIsCancel={setIsCancel} />}

      <ScheduleBox />

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
