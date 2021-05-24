import {wp, hp, getHp, getWp, width, height} from './viewUtils';
import {FONTSIZE} from './fontSize';
import {DRAWERNAV, setDrawerNav} from './navigationService';
import {transformFirebaseValues, getLargeNum} from './firebaseUtils';
import {
  maxNumberArrOfObj,
  removeDuplicateFromArr,
  sortArrayAlphabatically,
} from './array';
import {getFromToDate, toCurrentTimeZone, filterArrOnDate, timezoneToUTC} from './dateTime';
import {smallHitSlop, bigHitSlop} from './hitSlop';
import {validateEmail, validatePass} from './validation';

export {
  validateEmail,
  validatePass,
  width,
  height,
  smallHitSlop,
  bigHitSlop,
  wp,
  hp,
  getHp,
  getWp,
  FONTSIZE,
  transformFirebaseValues,
  maxNumberArrOfObj,
  getFromToDate,
  getLargeNum,
  removeDuplicateFromArr,
  sortArrayAlphabatically,
  toCurrentTimeZone,
  filterArrOnDate,
  timezoneToUTC
};
