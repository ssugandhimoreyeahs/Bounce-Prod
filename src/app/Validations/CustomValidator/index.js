import Validations from './validations';

class CustomValidator extends Validations {
  validate = validatableInput => {
    let isValid = true;
    Object.keys(validatableInput).map(vKey => {
      switch (vKey) {
        case ValidationTypes.REQUIRED:
          isValid = isValid && this.required(validatableInput.value);
          break;
      }
    });
    return isValid;
  };
}

let customValidator = new CustomValidator();
export default customValidator;
