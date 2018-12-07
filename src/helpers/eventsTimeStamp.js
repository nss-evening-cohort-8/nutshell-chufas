const timeStamp = () => {
  const date = new Date();
  const utcDate = date.toLocaleString();
  // console.log(utcDate);
  return utcDate;
};

export default timeStamp;
