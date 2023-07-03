import UserInfo from './components/ui/UserInfo';

const App = () => {
  return (
    <>
      <UserInfo
        styles={{
          size: '10.75rem',
        }}
        src="https://lh3.googleusercontent.com/a/AAcHTtdraz9lk5yB6ffVrzH-TL1MzMQgzuzAWVfOtO687Co0M9E=s83-c-mo"
      />
      <UserInfo
        styles={{
          size: '5.3125rem',
        }}
        src="https://lh3.googleusercontent.com/a/AAcHTtdraz9lk5yB6ffVrzH-TL1MzMQgzuzAWVfOtO687Co0M9E=s83-c-mo"
      />
    </>
  );
};

export default App;
