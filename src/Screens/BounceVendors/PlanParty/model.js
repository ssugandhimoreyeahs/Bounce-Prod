import {action, makeAutoObservable, observable} from 'mobx';
import {CreatePartyDTO} from '../../../app/DTO';
import {CreatePartyEntity} from '../../../app/Entities';

class InvitationPartyModel {
  @observable partyFields = new CreatePartyDTO();
  constructor() {
    makeAutoObservable(this);
  }

  @action
  setPartyFields = obj => {
    this.partyFields = this.partyFields.updateFields(obj);
  };
  @action
  addGallery = images => {
    this.partyFields = this.partyFields.addGallery(images);
  };
  @action
  removeGallery = image => {
    this.partyFields = this.partyFields.removeGallery(image);
  };
  @action
  setIsPrivate = (value) => {
    this.partyFields = this.partyFields.setIsPrivate(value);
  }
  @action
  validate = () => {
    this.partyFields = this.partyFields.validate();
  };
  getPartyEntity = () => {
    return new CreatePartyEntity(this.partyFields);
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
