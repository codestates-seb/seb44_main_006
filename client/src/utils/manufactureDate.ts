const manufactureDate = (date: string) => {
  const regex = /^(\d{2})(\d{2})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/;
  const match = date.match(regex);
  if (match) {
    const formattedDateTime = `${match[2]}.${match[3]}.${match[4]} ${match[5]}:${match[6]}`;
    return formattedDateTime;
  }
  return 'Invalid date and time format.';
};

export default manufactureDate;
