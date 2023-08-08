import { IconStyle } from '../../types/type';

const SaveIcon = ({ style }: { style: IconStyle }) => {
  return (
    <svg
      width={style.iconWidth}
      height={style.iconHeight}
      viewBox="0 0 22 22"
      fill={style.color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.55215 22V19.2543H20.4479V22H1.55215ZM7.69325 16.5086L0 8.69017L1.92331 6.72699L7.69325 12.5959L20.0726 0L22 1.95632L7.69325 16.5086Z"
        fill="black"
      />
    </svg>
  );
};
export default SaveIcon;
