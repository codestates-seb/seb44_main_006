import { memo } from 'react';

const Content = ({ postContent }: { postContent: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: postContent }} />;
};

export default memo(Content);
