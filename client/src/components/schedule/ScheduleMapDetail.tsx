import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FlexDiv } from '../../styles/styles';
import KakaoMap from '../map/KakaoMap';
import Marker from '../map/Marker';
import Polyline from '../map/Polyline';
import cssToken from '../../styles/cssToken';
import Title from '../ui/text/Title';
import Text from '../ui/text/Text';
import MapLocationCard from '../ui/cards/MapLocationCard';
import { IScheduleListItem } from '../../types/type';
import makePolyline from '../../utils/makePolyline';
import { RootState } from '../../store';
import { markerActions } from '../../store/marker-slice';
import GrayButton from '../ui/button/GrayButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import useMovePage from '../../hooks/useMovePage';
import CalenderIcon from '../../assets/CalendarIcon';
import formatData from '../../utils/sliceData';

const ScheduleDiv = styled(FlexDiv)`
  left: 0;
  top: 0;
  height: 100vh;
  background: #fff;
  padding: 15px;
  overflow: auto;
  flex-direction: column;
  gap: 1rem;
  flex: 0 0 25rem;
`;

const MapDiv = styled.div`
  width: 100%;
`;

const LocationCardWrapper = styled.div`
  overflow: auto;
`;

const Btnbox = styled.div`
  display: flex;
  gap: 10px;
`;

const TopWrap = styled(FlexDiv)`
  align-items: center;
  justify-content: space-between;
`;

const DataInfoText = styled(FlexDiv)`
  font-size: 0.8125rem;
  align-items: center;
  justify-content: space-between;
  gap: 0.1875rem;
  > svg {
    width: 14px;
  }
`;

const ScheduleMapDetail = ({
  destinationList,
  title,
  text,
  courseDday,
}: {
  destinationList: IScheduleListItem[];
  title: string;
  text: string;
  courseDday: string;
}) => {
  const latlng = useSelector((state: RootState) => state.marker.center);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gotoMain = useMovePage('/');
  const gotoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(
      markerActions.selectMarker({ markerId: '', center: { lat: '', lng: '' } })
    );
  }, [dispatch]);

  return (
    <FlexDiv>
      <ScheduleDiv>
        <TopWrap>
          <Title
            styles={{
              size: '1.5rem',
              color: cssToken.COLOR.black,
            }}
          >
            {title || ''}
          </Title>

          <DataInfoText>
            <CalenderIcon />
            {formatData(courseDday)}
          </DataInfoText>
        </TopWrap>


        <Text
          styles={{
            size: '0.85rem',
            color: cssToken.COLOR['gray-900'],
            weight: 300,
          }}
        >
          {text || ''}
        </Text>
        <LocationCardWrapper>
          {destinationList.map((destination, idx) => (
            <MapLocationCard
              key={uuidv4()}
              latlng={{ lat: destination.y, lng: destination.x }}
              id={destination.id}
              indexNum={idx + 1}
              location={destination.placeName}
            />
          ))}
        </LocationCardWrapper>
        <Btnbox>
          <GrayButton
            width="100%"
            height="50px"
            borderRadius="10px"
            onClick={gotoBack}
          >
            뒤로가기
          </GrayButton>
          <SkyBlueButton
            width="100%"
            height="50px"
            borderRadius="10px"
            onClick={gotoMain}
          >
            메인 페이지
          </SkyBlueButton>
        </Btnbox>
      </ScheduleDiv>
      <MapDiv>
        <KakaoMap
          center={{
            lat: destinationList[0].y,
            lng: destinationList[0].x,
            level: 3,
          }}
          selected={latlng}
          width="100%"
          height="100vh"
        >
          {destinationList.map((destination, idx) => (
            <Marker
              key={uuidv4()}
              lat={destination.y}
              lng={destination.x}
              id={destination.id ?? ''}
              idx={idx}
            />
          ))}
          <Polyline linePos={makePolyline(destinationList)} />
        </KakaoMap>
      </MapDiv>
    </FlexDiv>
  );
};

export default memo(ScheduleMapDetail);
