import RegexCollection from '../../constants/regexCollection';
import * as Yup from 'yup';

class Validations {
  required = value => {
    try {
      let isValid = Yup.string().required().validateSync(value);
      return true;
    } catch (error) {
      return false;
    }
  };

  minLength = (value = '', minLen = 0) => {
    try {
      let isValid = Yup.string().min(minLen).validateSync(value);
      return true;
    } catch (error) {
      return false;
    }
  };
  maxLength = (value = '', maxLen = 0) => {
    try {
      let isValid = Yup.string().max(maxLen).validateSync(value);
      return true;
    } catch (error) {
      return false;
    }
  };
  isEmail = (value = '') => {
    try {
      let isValid = Yup.string().required().email().validateSync(value);
      return true;
    } catch (error) {
      return false;
    }
  };

  isNum = value => {
    try {
      let numV = Number(value) || '';
      let isValid = Yup.number().required().validateSync(numV);
      return true;
    } catch (error) {
      return false;
    }
  };
  min = (value, minV) => {
    try {
      let numV = Number(value) || '';
      let isValid = Yup.number().required().min(minV).validateSync(numV);
      return true;
    } catch (error) {
      return false;
    }
  };
  max = (value, maxV) => {
    try {
      let numV = Number(value) || '';
      let isValid = Yup.number().required().max(maxV).validateSync(numV);
      return true;
    } catch (error) {
      return false;
    }
  };
  isUrl = value => {
    try {
      let isValid = Yup.string().required().url().validateSync(value);
      return true;
    } catch (error) {
      return false;
    }
  };
}

export default Validations;
