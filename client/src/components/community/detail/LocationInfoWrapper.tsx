import { styled } from 'styled-components';
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import cssToken from '../../../styles/cssToken';
import Title from '../../ui/text/Title';
import { FlexDiv } from '../../../styles/styles';
import { IScheduleListItem } from '../../../types/type';
import useCourseListScroll from '../../../hooks/useCourseListScroll';
import MapLocationCard from '../../ui/cards/MapLocationCard';

type LocationInfoT = {
  title: string;
  destinationList: IScheduleListItem[];
};

const ScheduleDiv = styled(FlexDiv)`
  flex-direction: column;
  row-gap: ${cssToken.SPACING['gap-12']};
  height: 60vh;
  @media screen and (max-width: 768px) {
    height: fit-content;
    max-height: 29vh;
    h1 {
      font-size: 1.125rem;
    }
  }
`;

const LocationCardWrapper = styled.div`
  overflow: auto;
`;

const LocationInfoWrapper = ({ title, destinationList }: LocationInfoT) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useCourseListScroll({
    element: scrollRef.current,
    clientHeight: scrollRef.current
      ? scrollRef.current.offsetHeight
      : undefined,
  });

  return (
    <ScheduleDiv>
      <Title styles={{ size: cssToken.TEXT_SIZE['text-24'] }}>
        {title || ''}
      </Title>
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
    </ScheduleDiv>
  );
};

export default LocationInfoWrapper;
