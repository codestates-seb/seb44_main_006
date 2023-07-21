const dateToString = (date: Date) => {
  // Tue Jul 11 2023 13:55:38 GMT+0900 (한국 표준시)
  const year = `${date.getFullYear()}`;
  const month =
    (date.getMonth() + 1).toString().length < 2
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

  return year + month + day;
};

export default dateToString;
