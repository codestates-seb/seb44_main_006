import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.Kakao.cleanup();
    window.Kakao.init(import.meta.env.VITE_API_KEY);
  }, []);
  return (
    <ToastContainer
      position="top-center"
      autoClose={500}
      hideProgressBar
      closeOnClick
      draggable
      theme="light"
    />
  );
};

export default App;
