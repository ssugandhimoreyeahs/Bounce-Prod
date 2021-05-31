import {RegexCollection} from '../../constants';
import {validate} from 'class-validator';
import ValidationTypes from '../ValidationTypes';
import ClassValidatorDecorators from './decorators';

class ClassValidator extends ClassValidatorDecorators {
  isValidate = async instance => {
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
let classValidator = new ClassValidator();
export default classValidator;
