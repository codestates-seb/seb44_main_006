import ThumbnailBox from './components/ui/thumbnail/ThumbnailBox';
import cssToken from './styles/cssToken';

const App = () => {
  return (
    <>
      <ThumbnailBox
        styles={{
          width: '100%',
          height: '0',
          borderRadius: cssToken.BORDER['rounded-s'],
        }}
        src="https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/big/202310454292163523295.jpg"
      />
      <br />
      <ThumbnailBox
        styles={{
          width: '312px',
          height: '184px',
        }}
        src="https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/big/202310454292163523295.jpg"
      />
      <br />
      <ThumbnailBox
        styles={{
          width: '437px',
          height: '238px',
        }}
        src="https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/big/202310454292163523295.jpg"
      />
    </>
  );
};

export default App;
