import {action, makeAutoObservable, observable, runInAction, toJS} from 'mobx';
import {CreatePartyDTO} from '../../../app/DTO';
import {Validation} from '../../../app/Validations';

class PlanPartyModel {
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
    this.partyFields = Object.assign({}, this.partyFields, fields);
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

  isPartyValid = async () => {
    let partyToJS = toJS(this.partyFields);
    let validateParty = new CreatePartyDTO(partyToJS);
    let schema = {success: false, partyFields: partyToJS};
    const isValid = await Validation.validateClassDecorator(validateParty);
    if (!isValid.success) {
      console.log("ERROR_PARTY - ", JSON.stringify(isValid));
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
      this.instance = new PlanPartyModel();
    }
    return this.instance;
  }
}
export default PlanPartyModel;
