import {action, makeAutoObservable, observable, runInAction} from 'mobx';
import {filterArrOnDate} from '../../../app/utils';

class PartyStore {
  @observable isLoading = false;
  @observable _party = [];

  constructor() {
    makeAutoObservable(this);
  }
  @action
  onLoadParty = (status = true) => {
    this._party = [];
    this.isLoading = status;
  };
  @action
  setParty = (party = []) => {
    // this.party = party;
    let sortedParty = filterArrOnDate(party);
    this._party = sortedParty.slice();
    this.isLoading = false;
  };

  get party() {
    return this._party.slice();
  }
}

export default PartyStore;
