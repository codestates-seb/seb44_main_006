import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { instance } from '../apis/api';
import { IScheduleRequest } from '../types/type';
import { selectedIdActions } from '../store/selectedId-slice';

// FIXME 일정 저장, 수정 오류 시 여기로
const checkRegister = async (data: IScheduleRequest) => {
  const response: Response =
    data.type === 'patch' && data.courseId
      ? await instance.patch(`/api/courses/${data.courseId}`, data)
      : await instance.post(`/api/courses`, data);
  return response;
};

const useScheduleMutation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const scheduleMutation = useMutation(checkRegister, {
    onSuccess: async (data) => {
      const status = data.status.toString()[0];
      if (status !== '2') return;
      dispatch(selectedIdActions.allReset());
      await queryClient.invalidateQueries(['user']);
      await queryClient.invalidateQueries(['mypage']);
    },
    onError: (error) => {
      const { response } = error as AxiosError;
      if (response) {
        navigate('/error', {
          state: {
            status: response.status,
            errormsg: response.statusText,
          },
        });
      }
    },
  });

  return scheduleMutation;
};

export default useScheduleMutation;
