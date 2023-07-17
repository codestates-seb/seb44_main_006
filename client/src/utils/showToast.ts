import { toast } from 'react-toastify';

const showToast = (toastType: string, text: string) => {
  if (toastType === 'success') {
    const notify = () => {
      toast.success(text);
    };
    return notify;
  }
  if (toastType === 'info') {
    const notify = () => {
      toast.info(text);
    };
    return notify;
  }
  if (toastType === 'error') {
    const notify = () => {
      toast.error(text);
    };
    return notify;
  }
  if (toastType === 'warning') {
    const notify = () => {
      toast.warning(text);
    };
    return notify;
  }
  const notify = () => {
    toast(text);
  };
  return notify;
};

export default showToast;
