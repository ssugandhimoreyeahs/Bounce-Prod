import {registerDecorator} from 'class-validator';

class ClassValidatorDecorators {
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
}

export default ClassValidatorDecorators;
