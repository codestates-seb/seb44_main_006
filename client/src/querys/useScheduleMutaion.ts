import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { instance } from '../apis/api';
import { IScheduleRequest } from '../types/type';
import { selectedIdActions } from '../store/selectedId-slice';

const checkRegister = async (data: IScheduleRequest) => {
  const response: Response = await instance.post(`/api/courses`, data);
  const status = response.status.toString()[0] === '2';

  return { status };
};

const useScheduleMutation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signupMutation = useMutation(checkRegister, {
    onSuccess: (data) => {
      if (!data?.status) {
        alert('요청 실패...');
        return;
      }
      dispatch(selectedIdActions.allReset());
      navigate('/');
    },
  });

  return signupMutation;
};

export default useScheduleMutation;
