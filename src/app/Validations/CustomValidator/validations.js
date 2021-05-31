import RegexCollection from '../../constants/regexCollection';

class Validations {
  required = value => {
    let requiredReg = new RegExp(RegexCollection.requiredString);
    return requiredReg.test(String(value).trim());
  };
}

export default Validations;
