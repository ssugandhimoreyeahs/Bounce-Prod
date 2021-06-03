import CustomValidator from '../CustomValidator';

import {registerDecorator} from 'class-validator';

class ClassValidatorDecorators {
  PartyAge = (property, validationOptions) => {
    return function (object, propertyName) {
      registerDecorator({
        name: 'PartyAge',
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

  IsMaxThen = (property, validationOptions) => {
    return function (object, propertyName) {
      registerDecorator({
        name: 'IsMaxThen',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          validate(value, args) {
            const [relatedPropertyName] = args.constraints;
            const relatedValue = args.object[relatedPropertyName];
            if (value <= args.object[property]) {
              return false;
            }
            return true;
          },
        },
      });
    };
  };
  validateNestedObj = (property, validationOptions) => {
    return function (object, propertyName) {
      registerDecorator({
        name: 'validateNestedObj',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          validate(value, args) {
            const [relatedPropertyName] = args.constraints;
            const relatedValue = args.object[relatedPropertyName];
            if (typeof property == 'object') {
              const isFieldValid = CustomValidator.validate({
                value: value[property.key],
                ...property,
              });
              return !isFieldValid.isError;
            } else {
              return true;
            }
          },
        },
      });
    };
  };

  validateNestedArray = (property, validationOptions) => {
    return function (object, propertyName) {
      registerDecorator({
        name: 'validateNestedArray',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          validate(value, args) {
            const [relatedPropertyName] = args.constraints;
            const relatedValue = args.object[relatedPropertyName];
          },
        },
      });
    };
  };
}

export default ClassValidatorDecorators;
