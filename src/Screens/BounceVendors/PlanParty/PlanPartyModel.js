import {action, makeAutoObservable, observable} from 'mobx';
import {CreatePartyDTO} from '../../../app/DTO'; 

class PlanPartyModel {
  @observable isEditMode = false;
  @observable party = new CreatePartyDTO();
  @observable editParty = {};
  constructor() {
    makeAutoObservable(this);
  }

  @action
  setEditParty = (editedParty) => {
    this.isEditMode = true;
    this.editParty = editedParty;
    this.party.reset(editedParty);
  }

  @action 
  reset = () => {
    // this.isEditMode = false;
    // this.editParty = {};
    this.party.reset();
  }
  static instance;
  static getInstance() {
    if (!this.instance) {
      this.instance = new PlanPartyModel();
    }
    return this.instance;
  }
}
export default PlanPartyModel;
