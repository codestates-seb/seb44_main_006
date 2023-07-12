import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';

import cssToken from '../../styles/cssToken';
import { RootState } from '../../store';
import MapLocationCard from '../ui/cards/MapLocationCard';
import { IScheduleListItem, TScheduleList } from '../../types/type';
import { scheduleListActions } from '../../store/scheduleList-slice';

const Wrapper = styled.div`
  width: ${cssToken.WIDTH['w-full']};
`;

const ScheduleListBox = () => {
  const dispatch = useDispatch();
  const schedules = useSelector((state: RootState) => state.scheduleList.list);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const copySchedules = JSON.parse(
      JSON.stringify(schedules)
    ) as TScheduleList;
    const targetSchedules = copySchedules.splice(source.index, 1);
    copySchedules.splice(destination.index, 0, ...targetSchedules);

    dispatch(scheduleListActions.updateList(copySchedules));
  };

  // requestAnimationFrame 초기화
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }
  // requestAnimationFrame 초기화 END

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Droppable key="schedules" droppableId="schedules">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {schedules.map((schedule: IScheduleListItem, idx: number) => (
                <Draggable
                  key={schedule.id}
                  draggableId={schedule.id}
                  index={idx}
                >
                  {(provided_two) => (
                    <div
                      ref={provided_two.innerRef}
                      {...provided_two.draggableProps}
                      {...provided_two.dragHandleProps}
                    >
                      <MapLocationCard
                        indexNum={idx + 1}
                        location={schedule.placeName}
                        id={schedule.id}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
};

export default ScheduleListBox;
