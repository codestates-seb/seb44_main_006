import SkeletonLocationCard from '../../skeleton/SkeletonLocationCard';

const SkeletonLocationContainer = ({ length }: { length: number }) => {
  const arr = [];
  for (let index = 0; index < length; index += 1) {
    arr.push(<SkeletonLocationCard />);
  }
  return arr;
};

export default SkeletonLocationContainer;
