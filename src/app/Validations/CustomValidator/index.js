import Validations from './validations';
import ValidationTypes from '../ValidationTypes';
class CustomValidator extends Validations {
  validate = validatableInput => {
    let processErrors = {isError: false};
    let isValid = true;
    Object.keys(validatableInput).map(vKey => {
      switch (vKey) {
        case ValidationTypes.required:
          isValid =
            isValid && this.required(validatableInput.value);
          if (!isValid) {
            processErrors.isError = true;
            processErrors[ValidationTypes.required] =
              validatableInput[ValidationTypes.required];
          }
          break;
      }
    });
    return processErrors;
  };
}

let customValidator = new CustomValidator();
export default customValidator;
