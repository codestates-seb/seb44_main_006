const getLoginStatus = () => {
  return localStorage.getItem('isLogin');
};

export default getLoginStatus;
