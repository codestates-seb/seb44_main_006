import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { RootState } from '../store';

const useCourseListScroll = ({
  element,
  clientHeight,
}: {
  element: HTMLElement | HTMLDivElement | null;
  clientHeight: number | undefined;
}) => {
  const scroll = useSelector((state: RootState) => state.marker.scroll);
  useEffect(() => {
    if (scroll && element && clientHeight) {
      const moveScroll = clientHeight;
      element.scrollTo({
        top: scroll - moveScroll,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [element, scroll, clientHeight]);
};

export default useCourseListScroll;
