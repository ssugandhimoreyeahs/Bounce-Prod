import ValidatorsFactory from './validatorsFactory';
import ValidationTypes from '../ValidationTypes';
import { registerDecorator } from 'class-validator';
class ValidationDecorators extends ValidatorsFactory {
  Required = validationObj => (target, propName) => {
    this.setValidator(target.constructor.name, propName, {...validationObj, type: ValidationTypes.REQUIRED });
  };

  IsGreaterThenNum = (property, validationOptions) => {
    return function (object, propertyName) {
      registerDecorator({
        name: 'isGreaterThenNum',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          validate(value, args) {
            const [relatedPropertyName] = args.constraints;
            const relatedValue = args.object[relatedPropertyName];
            return value > relatedValue;
             
          },
        },
      });
    };
  }

  IsLesserThen = (property, validationOptions) => {
    return function (object, propertyName) {
      registerDecorator({
        name: 'isGreaterThenNum',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          validate(value, args) {
            const [relatedPropertyName] = args.constraints;
            const relatedValue = args.object[relatedPropertyName];
            return value < relatedValue;
             
          },
        },
      });
    };
  }

  static instance;
  static getInstance() {
    if (!this.instance) {
      this.instance = new ValidationDecorators();
    }
    return this.instance;
  }
}
export default ValidationDecorators.getInstance();
