const thousandTok = (value: number | undefined) => {
  if (value === undefined) return 'invalid';
  if (value > 1000) return `${(10300 / 1000).toFixed(1)}k`;
  return value;
};

export default thousandTok;
