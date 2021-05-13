import DecoratorFactory from '../Decorators';
import ValidationTypes from '../ValidationTypes';
import Validation from '../Validation';
class DecoratorValidation {
  validateSingleValidation = (value, type) => {
    switch (type) {
      case ValidationTypes.REQUIRED:
        return Validation.required(value);
      default:
        return false;
    }
  };
  validate = target => {
    let errors = {};
    let getValidationsRules = DecoratorFactory.getValidators(
      target.constructor.name,
    );
    Object.keys(getValidationsRules).map(properties => {
      getValidationsRules[properties].map(singleValidation => {
        let isFieldValidate = this.validateSingleValidation(
          target[properties],
          singleValidation.type,
        );
        if (!isFieldValidate) {
          errors[properties] = singleValidation.message;
        }
      });
    });
    return errors;
  };

  static instance = undefined;
  static getInstance = () => {
    if (!this.instance) {
      this.instance = new DecoratorValidation();
    }

    return this.instance;
  };
}

export default DecoratorValidation.getInstance();
