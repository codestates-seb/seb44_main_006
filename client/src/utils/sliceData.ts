const formatData = (Days: string) => {
  if (Days) {
    const year = Days.slice(2, 4);
    const month = Days.slice(5, 7);
    const day = Days.slice(8, 10);
    return `${year}.${month}.${day}`;
  }
  return '';
};

export default formatData;
