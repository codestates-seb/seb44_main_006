import { useNavigate } from 'react-router-dom';

import EventButton from './EventButton';

import Pen from '../../../assets/icons/Pen';

const EditorButtonComponent = ({ courseId }: { courseId?: string }) => {
  const navigate = useNavigate();
  const gotoEditor = () => {
    if (courseId) {
      navigate(`/register?modify=true&courseId=${courseId}`);
    }
  };

  const handleEditor = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (courseId) gotoEditor();
  };

  return (
    <EventButton onClick={handleEditor}>
      <Pen
        style={{
          iconWidth: 18,
          iconHeight: 18,
          color: undefined,
        }}
      />
    </EventButton>
  );
};

export default EditorButtonComponent;
