import ValidatorsFactory from './validatorsFactory';
import ValidationTypes from '../ValidationTypes';
import {registerDecorator} from 'class-validator';
import {RegexCollection} from '../../constants';
class ValidationDecorators extends ValidatorsFactory {
  Required = validationObj => (target, propName) => {
    this.setValidator(target.constructor.name, propName, {
      ...validationObj,
      type: ValidationTypes.REQUIRED,
    });
  };

  PartyAge = (property, validationOptions) => {
    return function (object, propertyName) {
      registerDecorator({
        name: 'partyFromAge',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          validate(value, args) {
            const [relatedPropertyName] = args.constraints;
            const relatedValue = args.object[relatedPropertyName]; 
            if (relatedValue == 0 && value == 0) {
              return true;
            }
            if (property == 'toAge') {
              if (relatedValue > 0 && value == 0) {
                return false;
              } else if (relatedValue <= value) {
                return false;
              } else {
                return true;
              }
            } else {
              if (relatedValue > 0 && value == 0) {
                return false;
              } else if (relatedValue >= value) {
                return false;
              } else {
                return true;
              }
            }
          },
        },
      });
    };
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
