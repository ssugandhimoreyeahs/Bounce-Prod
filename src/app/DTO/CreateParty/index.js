import {
  Party as CreatePartyEntity,
  Ticket as TicketEntity,
} from '../../Entities';
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
  setAddress = addressStr => {
    this.location.addressStr = addressStr;
    this.notifyListeners();
  };
  addGallery = images => {
    this.galleryFiles.push(...images);
    this.notifyListeners();
  };

  removeGallery = (action = false, image) => {
    if (action == false) {
      let findIndex = this.galleryFiles.findIndex(i => i.path == image);
      if (findIndex > -1) {
        this.galleryFiles.splice(findIndex, 1);
      }
    } else {
      let findIndex = this.gallery.findIndex(i => i.filePath == image);
      if (findIndex > -1) {
        this.gallery.splice(findIndex, 1);
      }
    }

    this.notifyListeners();
  };
  setIsPrivate = value => {
    this.isPrivate = value;
    this.notifyListeners();
  };
  isPartyValid = async (isDraftMode = false, isEditMode = false) => {
    let validateParty = CreatePartyEntity.toJSON(this, isEditMode);
    validateParty.isDraft = isDraftMode;
    let schema = {success: false, partyFields: validateParty, error: {}};
    if (validateParty.galleryFiles.length == 0) {
      validateParty.galleryFiles.push(undefined);
    }
    const isValid = await Validation.validateClassDecorator(validateParty);
    if (!isValid.success) {
      console.log('ERROR_PARTY - ', JSON.stringify(isValid));
      schema.error = isValid.errors;
    } else {
      schema.success = true;
      if (validateParty.galleryFiles[0] == undefined) {
        delete validateParty.galleryFiles;
      }
    }
    return schema;
  };

  reset = (preParty = {}) => {
    if (Object.keys(preParty).length == 0) {
      Object.assign(this, new CreatePartyEntity());
    } else {
      Object.assign(this, CreatePartyEntity.fromJSON(preParty));
    }
    this.notifyListeners();
  };

  addTicketType = () => {
    this.tickets.push(new TicketEntity());
    this.notifyListeners();
  };

  onTicketChangeText = (data, index) => {
    this.tickets[index] = {...this.tickets[index], ...data};
    this.notifyListeners();
  };

  onTicketDelete = index => {
    this.tickets = [...this.tickets.filter((_, i) => i != index)];
    this.notifyListeners();
  };
}

export default CreatePartyDTO;
