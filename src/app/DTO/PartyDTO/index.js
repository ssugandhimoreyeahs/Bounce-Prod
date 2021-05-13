import {Decorators as D, DecoratorValidation} from '../../Validations';

class PartyDTO {
  @D.Required({message: 'Required Title'})
  title = '';
 
  galleryFiles = [];
  date = '';
  location = {
    lat: '',
    long: '',
    addressStr: '',
  };

  @D.Required({message: 'Required Description'})
  description = '';

  error = {};




  toString = () => {
    let json = {PartyDTO: this};
    return JSON.stringify(json);
  };
  validate = () => {
    const errors = DecoratorValidation.validate(this);
    console.log('ERRORS_PARTY_DTO - ', errors);
    this.error = {...errors};
    return this.notify();
  };
  notify = () => {
    return {...this};
  };
}

export default PartyDTO;
