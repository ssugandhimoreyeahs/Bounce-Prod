import {action, makeAutoObservable, observable, runInAction} from 'mobx';
import {filterArrOnDate} from '../../../app/utils';

class PartyStore {
  @observable isLoading = false;
  @observable party = [];

  constructor() {
    makeAutoObservable(this);
  }
  @action
  onLoadParty = (status = true) => {
    this.party = [];
    this.isLoading = status;
  };
  @action
  setParty = (party = []) => {
    this.party = party;
    //let sortedParty = filterArrOnDate(party);
    //this.party = sortedParty.slice();
    this.isLoading = false;
  };
}

export default PartyStore;
