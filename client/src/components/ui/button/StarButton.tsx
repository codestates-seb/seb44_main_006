import Button from './Button';

import cssToken from '../../../styles/cssToken';

const StarButton = ({
  width,
  height,
  isActive,
}: {
  width: string;
  height: string;
  isActive: boolean;
}) => {
  return (
    <Button
      styles={{
        width,
        height,
        backgroundColor: isActive
          ? cssToken.COLOR['point-100']
          : cssToken.COLOR['gray-300'],
        borderRadius: cssToken.BORDER['rounded-full'],
      }}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 21.7742L20.0473 25.7642C21.2463 26.4955 22.7136 25.4145 22.398 24.0474L20.6626 16.5443L26.4526 11.4892C27.5097 10.5672 26.9417 8.81858 25.5534 8.7073L17.9332 8.05555L14.9515 0.965712C14.415 -0.321904 12.585 -0.321904 12.0485 0.965712L9.06676 8.03965L1.44665 8.69141C0.0583065 8.80268 -0.509653 10.5513 0.547382 11.4733L6.33741 16.5284L4.60198 24.0315C4.28645 25.3986 5.75367 26.4796 6.9527 25.7483L13.5 21.7742Z"
          fill={
            isActive ? cssToken.COLOR['point-900'] : cssToken.COLOR['gray-700']
          }
        />
      </svg>
    </Button>
  );
};

export default StarButton;
