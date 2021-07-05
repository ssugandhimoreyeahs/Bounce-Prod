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
  setTags = (tags = []) => {
    this.partyTags = tags;
  };

  getTags = () => {
    return this.partyTags.slice();
  }

}

export default TagStore;
