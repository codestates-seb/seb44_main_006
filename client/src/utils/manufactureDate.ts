const manufactureDate = (date = '0000-00-00T00:00:00') => {
  const currentTime = Date.now();
  const newDate = new Date(date);
  const targetTime = new Date(newDate).getTime();
  const minutesDifference = Math.floor(
    (currentTime - targetTime) / (1000 * 60)
  );
  if (isNaN(minutesDifference)) {
    return 'invalid';
  }
  if (minutesDifference < 1) {
    return 'now';
  }
  if (minutesDifference < 60) {
    return `${minutesDifference} min ago`;
  }
  if (minutesDifference < 1440) {
    return `${Math.floor(minutesDifference / 60)} hour ago`;
  }
  return `${Math.floor(minutesDifference / 1440)} days ago`;
};

export default manufactureDate;
