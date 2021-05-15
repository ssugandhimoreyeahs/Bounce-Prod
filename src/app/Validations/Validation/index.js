import {RegexCollection} from '../../constants';
import {validate} from 'class-validator';
import ValidationTypes from '../ValidationTypes';
class Validation {
  static required = value => {
    let requiredReg = new RegExp(RegexCollection.requiredString);
    return requiredReg.test(String(value).trim());
  };

  static validateForm = validatableInput => {
    let isValid = true;
    if (validatableInput[ValidationTypes.REQUIRED]) {
      isValid = isValid && this.required(validatableInput.value);
    }
    return isValid;
  };
  static validateClassDecorator = async instance => {
    let valid = {
      success: false,
      errors: {},
    };
    const errors = await validate(instance);
    if (errors.length) {
      errors.map(errorItem => {
        let err = errorItem.constraints[Object.keys(errorItem.constraints)[0]];
        valid.errors = {
          ...valid.errors,
          [errorItem.property]: err,
        };
      });
      return valid;
    }
    valid.success = true;
    return valid;
  };
}

export default Validation;
