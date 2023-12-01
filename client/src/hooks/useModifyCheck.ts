import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useModifyCheck = () => {
  const location = useLocation();

  const [isModify, setIsModify] = useState(false);
  const [courseId, setIsCourseId] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modify = params.get('modify');
    const id = params.get('courseId');
    if (modify) setIsModify(Boolean(modify));
    if (id) setIsCourseId(id);
  }, [location.search]);

  return {
    isModify,
    courseId,
  };
};

export default useModifyCheck;
