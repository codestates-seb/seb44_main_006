function calculateDDay(targetDate: string) {
  const today = new Date();
  const targetDateTime = new Date(targetDate);
  const timeDiff = targetDateTime.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
}

const formatData = (Days: string) => {
  if (Days) {
    console.log(Days);
    console.log(calculateDDay(Days.split(',')[0]));
    const Dday = calculateDDay(Days.split(',')[0]);
    if (Dday < 0) return `D+${Dday * -1}`;
    if (Dday === 0) return 'D-day';
    if (Dday > 100) {
      const year = Days.slice(2, 4);
      const month = Days.slice(5, 7);
      const day = Days.slice(8, 10);
      return `${year}.${month}.${day}`;
    }
    return `D-${Dday}`;
  }
  return '';
};

export default formatData;
