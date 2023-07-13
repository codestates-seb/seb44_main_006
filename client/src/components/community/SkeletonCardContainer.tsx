import SkeletonContentCard from '../skeleton/SkeletonContentCard';

const SkeletonCardContainer = () => {
  const arr = [];
  for (let index = 0; index < 11; index += 1) {
    arr.push(<SkeletonContentCard />);
  }
  return arr;
};

export default SkeletonCardContainer;
