import { v4 as uuidv4 } from 'uuid';

import SkeletonContentCard from '../../skeleton/SkeletonContentCard';

const SkeletonCardContainer = ({ length }: { length: number }) => {
  const arr = [];
  for (let index = 0; index < length; index += 1) {
    arr.push(<SkeletonContentCard key={uuidv4()} />);
  }
  return <>{arr}</>;
};

export default SkeletonCardContainer;
