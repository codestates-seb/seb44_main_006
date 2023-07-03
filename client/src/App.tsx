import SubTitle from './components/ui/textUi/SubTitle';
import Text from './components/ui/textUi/Text';
import Title from './components/ui/textUi/Title';
import cssToken from './styles/cssToken';

const App = () => {
  return (
    <>
      <Title
        styles={{
          size: cssToken.TEXT_SIZE['text-80'],
          color: cssToken.COLOR['point-900'],
        }}
      >
        커뮤니티
      </Title>
      <SubTitle
        styles={{
          size: '2.5rem',
          color: cssToken.COLOR['red-900'],
          weight: 'Medium',
        }}
      >
        서브타이틀
      </SubTitle>
      <Text>기본 텍스트</Text>
    </>
  );
};

export default App;
