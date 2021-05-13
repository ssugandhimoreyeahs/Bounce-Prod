import {Decorators as D, DecoratorValidation} from '../../Validations';
import {CreatePartyEntity} from '../../Entities';

class CreatePartyDTO extends CreatePartyEntity {
  error = {};

  updateFields = (fields) => { 
    for (key in fields) {
      this[key] = fields[key];
      if (this.error[key]) {
        delete this.error[key];
      }
    }
    return this.notify();
  }
  addGallery = (images) => { 
    this.galleryFiles.push(...images);
    return this.notify();
  }
  removeGallery = image => { 
    let findIndex = this.galleryFiles.findIndex(i => i.path == image.path);
    if (findIndex > -1) {
      nextParty.galleryFiles.splice(findIndex, 1);
    }
    return this.notify();
  };
  setIsPrivate = (value) => {
    this.isPrivate = value;
    return this.notify();
  }
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

export default CreatePartyDTO;
