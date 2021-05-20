import {action, makeAutoObservable, observable, runInAction} from 'mobx';

class PartyStore {
  @observable isLoading = false; 
  @observable party = [];

  constructor() {
    makeAutoObservable(this);
  } 
  @action
  onLoadParty = (status = true) => {
    this.isLoading = status;
  }
  @action
  setParty = (party = []) => {
    this.party = party;
    this.isLoading = false;
  }; 
}

export default PartyStore;
