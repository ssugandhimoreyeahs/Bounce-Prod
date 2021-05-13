
import { RegexCollection } from '../../constants';

class Validation {

    static required = (value) => {
        let requiredReg = new RegExp(RegexCollection.requiredString);
        return requiredReg.test(String(value).trim());
    }
}

export default Validation;