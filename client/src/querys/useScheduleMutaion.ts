import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { instance } from '../apis/api';
import { IScheduleRequest } from '../types/type';
import { selectedIdActions } from '../store/selectedId-slice';

const checkRegister = async (data: IScheduleRequest) => {
  const response: Response = await instance.post(`/api/courses`, data);
  return response;
};

const useScheduleMutation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scheduleMutation = useMutation(checkRegister, {
    onSuccess: (data) => {
      const status = data.status.toString()[0];
      if (status !== '2') return;
      dispatch(selectedIdActions.allReset());
    },
    onError: (error) => {
      const { response } = error as AxiosError;
      if (response) navigate(`/error/${response.status}`);
    },
  });

  return scheduleMutation;
};

export default useScheduleMutation;
