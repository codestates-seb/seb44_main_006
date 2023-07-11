import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    window.Kakao.cleanup();
    window.Kakao.init(import.meta.env.VITE_API_KEY);
    console.log(window.Kakao.isInitialized());
  });
  return <></>;
};

export default App;
