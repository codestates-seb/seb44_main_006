import { IconStyle } from '../../types/type';

const ThreeLine = ({ style }: { style: IconStyle }) => {
  return (
    <svg
      width={style.iconWidth}
      height={style.iconHeight}
      viewBox="0 0 17 11"
      fill={style.color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 1V0H17V1H0ZM17 5V6H0V5H17ZM0 10H17V11H0V10Z" fill="black" />
    </svg>
  );
};
export default ThreeLine;
