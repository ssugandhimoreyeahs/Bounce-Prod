import moment from 'moment';

export const getFromToDate = (from, to) => {
  let fromm = new Date(from);
  let too = new Date(to);
  let fromDate = moment(fromm).format('MMM DD');
  let toDate = moment(too).format('MMM DD');
  console.log(toDate);
  if (toDate == 'Invalid date' || fromDate == 'Invalid date') {
    return '';
  }

  return `From ${fromDate} To ${toDate}`;
};

export const toCurrentTimeZone = date => {
  let dt = moment(date);
  let timeOffset = new Date().getTimezoneOffset();
  if (timeOffset > 0) {
    dt.add(Math.abs(timeOffset), 'minute');
  } else {
    dt.subtract(Math.abs(timeOffset), 'minute');
  }
  return dt.toDate();
};

export const filterArrOnDate = arr => {
  return arr.sort(function compare(a, b) {
    var dateA = new Date(a.createdAt);
    var dateB = new Date(b.createdAt);
    return dateB - dateA;
  });
};

export const timezoneToUTC = actualDT => {
  let value = new Date(actualDT);
  let diff = new Date().getTimezoneOffset() * 60000;
  return new Date(value.getTime() + diff);
};
