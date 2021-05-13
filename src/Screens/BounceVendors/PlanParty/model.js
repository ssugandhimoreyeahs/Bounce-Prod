import {action, makeAutoObservable, observable, runInAction} from 'mobx';
import {CreatePartyDTO} from '../../../app/DTO';
import {Validation} from '../../../app/Validations';

class InvitationPartyModel {
  @observable partyFields = new CreatePartyDTO();
  @observable partyFieldsErrors = {};
  constructor() {
    makeAutoObservable(this);
  }

  @action
  setPartyFields = fields => {
    for (key in fields) {
      if (this.partyFieldsErrors[key]) {
        delete this.partyFieldsErrors[key];
      }
    }
    this.partyFields = {
      ...this.partyFields,
      ...fields,
    };
  };
  @action
  addGallery = images => {
    let nextParty = {...this.partyFields};
    nextParty.galleryFiles.push(...images);
    this.partyFields = nextParty;
  };
  @action
  removeGallery = image => {
    let nextParty = {...this.partyFields};
    let findIndex = nextParty.galleryFiles.findIndex(i => i == image);
    if (findIndex > -1) {
      nextParty.galleryFiles.splice(findIndex, 1);
    }
    this.partyFields = nextParty;
  };

  @action
  isPartyValid = async () => {
    let schema = {success: false, partyFields: this.partyFields};
    const isValid = await Validation.validateClassDecorator(
      new CreatePartyDTO(this.partyFields),
    );
    if (!isValid.success) {
      runInAction(() => {
        this.partyFieldsErrors = isValid.errors;
      });
      return schema;
    }
    schema.success = true;
    return schema;
  };

  static instance;
  static getInstance() {
    if (!this.instance) {
      this.instance = new InvitationPartyModel();
    }
    return this.instance;
  }
}
export default InvitationPartyModel;
