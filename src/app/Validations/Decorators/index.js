import ValidatorsFactory from './validatorsFactory';
import ValidationTypes from '../ValidationTypes';

class ValidationDecorators extends ValidatorsFactory {
  Required = validationObj => (target, propName) => {
    this.setValidator(target.constructor.name, propName, {...validationObj, type: ValidationTypes.REQUIRED });
  };
  static instance;
  static getInstance() {
    if (!this.instance) {
      this.instance = new ValidationDecorators();
    }
    return this.instance;
  }
}
export default ValidationDecorators.getInstance();
