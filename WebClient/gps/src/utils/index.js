export const formatDate = (d) => {
  const date = new Date(d);
  let dd = date.getDate();
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return (d = `${dd}/${mm}/${yyyy} ${hours}:${minutes}:${seconds}`);
};

const utils = {
  formatDate,
};

export default utils;
