import {Party as CreatePartyEntity} from '../../Entities';
import {ReactModel} from '../../core';
import {Validation} from '../../Validations';
@ReactModel()
class CreatePartyDTO extends CreatePartyEntity {
  partyError = {};

  set = fields => {
    for (key in fields) {
      if (this.partyError[key]) {
        delete this.partyError[key];
      }
      this[key] = fields[key];
    }
    this.notifyListeners();
  };
  setAddress = (addressStr) => {
    this.location.addressStr = addressStr;
    this.notifyListeners();
  }
  addGallery = images => {
    this.galleryFiles.push(...images);
    this.notifyListeners();
  };

  removeGallery = image => {
    let findIndex = this.galleryFiles.findIndex(i => i == image);
    if (findIndex > -1) {
      this.galleryFiles.splice(findIndex, 1);
    }
    this.notifyListeners();
  };
  setIsPrivate = value => {
    this.isPrivate = value;
    this.notifyListeners();
  };
  isPartyValid = async () => {
    let validateParty = new CreatePartyEntity(this);
    let schema = {success: false, partyFields: validateParty};
    const isValid = await Validation.validateClassDecorator(validateParty);
    if (!isValid.success) {
      console.log('ERROR_PARTY - ', JSON.stringify(isValid));
      this.partyError = isValid.errors;
    } else {
      schema.success = true;
    }
    this.notifyListeners();
    return schema;
  };
}

export default CreatePartyDTO;
