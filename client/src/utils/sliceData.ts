function calculateDDay(targetDate: string) {
  const today = new Date();
  const targetDateTime = new Date(targetDate);
  const timeDiff = targetDateTime.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
}

function getWeekday(dateStr: string) {
  const date = new Date(dateStr);
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekdayIndex = date.getDay();
  const weekday = weekdays[weekdayIndex];
  return weekday;
}

const formatData = (Days: string, location?: string) => {
  if (Days) {
    console.log(Days);
    console.log(calculateDDay(Days.split(',')[0]));
    const Dday = calculateDDay(Days.split(',')[0]);
    if (location) {
      // 일정 상세페이지인 경우
      const year = Days.slice(2, 4);
      const month = Days.slice(5, 7);
      const day = Days.slice(8, 10);

      const dateStr = Days.slice(0, 10);
      const weekday = getWeekday(dateStr);

      return `${year}.${month}.${day} ${weekday}`;
    }
    if (Dday < 0) return `D+${Dday * -1}`;
    if (Dday === 0) return 'D-day';

    return `D-${Dday}`;
  }
  return '';
};

export default formatData;
