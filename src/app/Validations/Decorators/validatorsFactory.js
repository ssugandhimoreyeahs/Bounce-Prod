class ValidatorsFactory {
  validators = {};

  setValidator = (constructorName, propName, validationObj) => {
    this.validators = {
      ...this.validators,
      [constructorName]: {
        ...this.validators[constructorName],
        [propName]: [
          ...this.getPreviousRules(constructorName, propName),
          validationObj,
        ],
      },
    };
  };

  getPreviousRules = (constructorName, propName) => {
    let rules = [];
    if (this.validators[constructorName]) {
      if (this.validators[constructorName][propName]) {
        rules = this.validators[constructorName][propName];
      }
    }
    return rules;
  };

  getValidators = (constructorName) => {
    return {...this.validators[constructorName]};
  }
}

export default ValidatorsFactory;
