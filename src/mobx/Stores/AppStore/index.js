import {action, makeAutoObservable, observable, runInAction} from 'mobx';

class AppStore {
  @observable loader = false;

  constructor() {
    makeAutoObservable(this);
  }
  @action
  toogleLoader = (flag = undefined) => {
    if (flag) {
      this.loader = flag;
      return;
    }
    this.loader = !this.loader;
  };
}

export default AppStore;
