import { styled } from 'styled-components';

const Img = styled.img`
  width: 50%;
`;

const CatContainer = ({ status }: { status: number }) => {
  return <Img src={`https://http.cat/${status}.jpg`} alt="status에러" />;
};

export default CatContainer;
