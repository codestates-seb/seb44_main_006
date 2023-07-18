const getLoginStatus = (): boolean => {
  const isLogin = localStorage.getItem('isLogin');
  return isLogin ? JSON.parse(isLogin) : false;
};

export default getLoginStatus;
