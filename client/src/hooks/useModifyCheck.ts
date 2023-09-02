import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useModifyCheck = () => {
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const [isModify, setIsModify] = useState(false);
  const [courseId, setIsCourseId] = useState('');

  useEffect(() => {
    const modify = params.get('modify');
    const id = params.get('courseId');
    if (modify) setIsModify(Boolean(modify));
    if (id) setIsCourseId(id);
  }, [params]);

  return {
    isModify,
    courseId,
  };
};

export default useModifyCheck;
