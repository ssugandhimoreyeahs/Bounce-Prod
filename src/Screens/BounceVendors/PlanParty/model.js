import {action, makeAutoObservable, observable} from 'mobx';
import {PartyDTO} from '../../../app/DTO';

class InvitationPartyModel {
  @observable partyFields = new PartyDTO();
  constructor() {
    makeAutoObservable(this);
  }

  @action
  setPartyFields = obj => {
    let nextParty = {...this.partyFields};
    for (o in obj) {
        nextParty[o] = obj[o];
      if (nextParty.error[o]) {
        delete nextParty.error[o];
      }
    }
    this.partyFields = nextParty;
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
    let findIndex = nextParty.galleryFiles.findIndex(i => i.path == image.path);
    if (findIndex > -1) {
      nextParty.galleryFiles.splice(findIndex, 1);
    }
    this.partyFields = nextParty;
  };

  @action
  validate = () => {
    this.partyFields = this.partyFields.validate();
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
