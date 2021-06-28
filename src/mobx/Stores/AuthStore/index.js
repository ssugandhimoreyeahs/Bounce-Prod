import {
  observable,
  action,
  runInAction,
  makeAutoObservable,
  computed,
} from 'mobx';
import Asynctask from './Asynctask';
import {LocalStorage} from '../../../app/utils/localStorage';
import {AccountService} from '../../../app/services';

class AuthStore {
  @observable userProfile = {};
  @observable AllAccounts = [];
  @observable isAuthenticated = false;
  @observable isAutoLoginDone = false;
  async;
  rootStore;
  constructor(rootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.async = new Asynctask(this, rootStore);
  }
  onVendorRegistration = userProfile => {
      this.isAuthenticated = true;
      this.userProfile = Object.assign({}, userProfile);
      AccountService.addNewAccount(Object.assign({}, userProfile));
  };
  logout = () => { 
      this.isAuthenticated = false;
      this.userProfile = {}; 
  };
  onAutoLogin = userProfile => {
      this.userProfile = userProfile;
      this.isAuthenticated = true;
      this.isAutoLoginDone = true;
  };
  onReloadVendor = user => {
      let nextUserProfile = Object.assign({}, this.userProfile);
      nextUserProfile.user = user;
      this.userProfile = nextUserProfile;
  };
  @action
  onUserRegistration = body => {
    let userDetailsObj = {
      success: true,
      token: body.accessToken,
      user: body.user,
    };
    this.userProfile = userDetailsObj;
    this.isAuthenticated = true;
    LocalStorage.onSignUp(body.accessToken, JSON.stringify(body.user));
    AccountService.addNewAccount(userDetailsObj);
  };

  setAllAccounts = async () => {
    this.AllAccounts = await AccountService.getAllAccounts();
  }

  setUserProfile = data => {
    this.userProfile = data
  }
 
  @computed
  get token() {
    return this.userProfile.token;
  }

  @computed
  get isVendor() {
    let vendorType = this.userProfile?.user?.vendorType;
    return vendorType == 2 ? false : true;
  }
}

export default AuthStore;
