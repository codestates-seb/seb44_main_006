import Header from './components/common/Header';

const App = () => {
  return (
    <>
      <Header isMainPage />
      <Header isMainPage={false} />
    </>
  );
};

export default App;
