import {action, makeAutoObservable, observable, runInAction} from 'mobx';

class PartyStore {
  @observable isLoaded = false;
  @observable party = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setParty = (party = []) => {
    this.party = party;
    this.isLoaded = true;
  };
}

export default PartyStore;
