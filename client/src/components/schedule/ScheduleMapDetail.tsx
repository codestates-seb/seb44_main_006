import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { memo, useEffect, useRef } from 'react';
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
import { markerActions } from '../../store/marker-slice';
import GrayButton from '../ui/button/GrayButton';
import SkyBlueButton from '../ui/button/SkyBlueButton';
import useMovePage from '../../hooks/useMovePage';
import CalenderIcon from '../../assets/CalendarIcon';
import formatData from '../../utils/sliceData';
import BottomSheet from '../ui/bottomsheet/BottomSheet';
import usePanMap from '../../hooks/usePanMap';
import useCourseListScroll from '../../hooks/useCourseListScroll';
import getLoginStatus from '../../utils/getLoginStatus';
import useLocationEndpoint from '../../hooks/useLocationEndpoint';

const ScheduleDiv = styled(FlexDiv)`
  left: 0;
  top: 0;
  height: ${cssToken.HEIGHT['h-screen']};
  background: ${cssToken.COLOR.white};
  padding: ${cssToken.SPACING['gap-16']};
  overflow: auto;
  flex-direction: column;
  gap: ${cssToken.SPACING['gap-16']};
  flex: 0 0 25rem;

  @media (max-width: 768px) {
    height: 80vh;
  }
`;

const MapDiv = styled.div`
  width: ${cssToken.WIDTH['w-full']};
`;

const LocationCardWrapper = styled.div`
  overflow: auto;
`;

const Btnbox = styled.div`
  display: flex;
  gap: ${cssToken.SPACING['gap-10']};

  @media (max-width: 768px) {
    display: none;

    .gray {
      width: ${cssToken.WIDTH['w-full']};
    }
    .skyblue {
      width: ${cssToken.WIDTH['w-full']};
    }
  }
`;

const TopWrap = styled(FlexDiv)`
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column-reverse;
  gap: ${cssToken.SPACING['gap-10']};

  > h1 {
    flex: 2;
    gap: 0.3125rem;
  }
  @media (max-width: 768px) {
    h1 {
      font-size: 1.2rem;
    }
  }
`;

const DataInfoText = styled(FlexDiv)`
  font-size: 0.8125rem;
  align-items: center;
  justify-content: flex-end;
  width: ${cssToken.WIDTH['w-full']};
  gap: 0.1875rem;
  > svg {
    width: 0.875rem;
  }
`;

const FixedDiv = styled.div`
  position: fixed;
  display: none;
  flex-direction: row;
  gap: ${cssToken.SPACING['gap-12']};
  top: ${cssToken.SPACING['gap-12']};
  right: ${cssToken.SPACING['gap-12']};
  z-index: 999;

  @media (max-width: 768px) {
    display: flex;
  }
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const isLogin = getLoginStatus();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocationEndpoint();
  const gotoMain = useMovePage('/');
  const gotoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(
      markerActions.setInitialCenter({
        lat: destinationList[0].y,
        lng: destinationList[0].x,
        level: 6,
      })
    );
    dispatch(
      markerActions.selectMarker({
        markerId: '',
        center: {
          lat: '',
          lng: '',
        },
      })
    );
  }, [destinationList, dispatch]);

  usePanMap();
  useCourseListScroll({
    element: scrollRef.current,
    clientHeight: scrollRef.current
      ? scrollRef.current.offsetHeight
      : undefined,
  });

  return (
    <FlexDiv>
      <BottomSheet param="detail">
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
              {formatData(courseDday, location)}
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
          <LocationCardWrapper ref={scrollRef}>
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
            {isLogin && (
              <GrayButton
                width="100%"
                height="50px"
                brradius="10px"
                onClick={gotoBack}
              >
                뒤로가기
              </GrayButton>
            )}
            <SkyBlueButton
              width="100%"
              height="50px"
              brradius="10px"
              onClick={gotoMain}
            >
              메인 페이지
            </SkyBlueButton>
          </Btnbox>
        </ScheduleDiv>
      </BottomSheet>

      <FixedDiv>
        <FloatButton bgcolor={cssToken.COLOR['gray-300']} onClick={gotoBack}>
          <div>뒤로가기</div>
        </FloatButton>
        <FloatButton
          bgcolor={cssToken.COLOR['point-900']}
          fontcolor={cssToken.COLOR.white}
          onClick={gotoMain}
        >
          <div>메인 페이지</div>
        </FloatButton>
      </FixedDiv>
      <MapDiv>
        <KakaoMap width="100%" height="100vh">
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
