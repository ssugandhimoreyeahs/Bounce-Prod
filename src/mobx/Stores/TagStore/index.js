import {
  observable,
  action,
  runInAction,
  makeAutoObservable,
  computed,
} from 'mobx';
import {LocalStorage} from '../../../app/utils/localStorage';

class TagStore {
  @observable partyTags = [];
  constructor() {
    makeAutoObservable(this);
  }

  @action
  setTags = (Tags = []) => {
    this.partyTags = Tags;
  };

}

export default TagStore;
