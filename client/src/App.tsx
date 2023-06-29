import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <button
      type="button"
      onClick={() => {
        setCount(count + 1);
      }}
    >
      {count}
    </button>
  );
};

export default App;
