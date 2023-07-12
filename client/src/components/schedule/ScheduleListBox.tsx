import { styled } from 'styled-components';
import { useSelector } from 'react-redux';

import cssToken from '../../styles/cssToken';
import { RootState } from '../../store';
import MapLocationCard from '../ui/cards/MapLocationCard';
import { IScheduleListItem } from '../../types/type';

const Wrapper = styled.div`
  width: ${cssToken.WIDTH['w-full']};
`;

const ScheduleListBox = () => {
  const schedules = useSelector((state: RootState) => state.scheduleList.list);
  return (
    <Wrapper>
      {schedules.map((schedule: IScheduleListItem, idx: number) => (
        <MapLocationCard
          indexNum={idx + 1}
          location={schedule.placeName}
          id={schedule.id}
        />
      ))}
    </Wrapper>
  );
};

export default ScheduleListBox;
