import AsyncStorage from '@react-native-async-storage/async-storage';
import MobxStore from '../../../mobx';

const LOCAL_STORAGE_TOKEN = {
  USERS: 'USERS',
};
const {authStore} = MobxStore;
let users = [];

class AccountService {
  addNewAccount = async userDetail => {
    try {
      let isAvailable = await this.isAdded(userDetail?.user.id);
      let oldUsers = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN.USERS);
      Promise.resolve(oldUsers);
      Promise.resolve(isAvailable);
      if (!isAvailable) {
        if (oldUsers == null || oldUsers == undefined) {
          users = [];
        } else {
          users = JSON.parse(oldUsers);
        }
        users.push(userDetail);
        await AsyncStorage.setItem(
          LOCAL_STORAGE_TOKEN.USERS,
          JSON.stringify(users),
        );
      } else {
        await AsyncStorage.setItem(
          LOCAL_STORAGE_TOKEN.USERS,
          JSON.stringify(users),
        );
      }
    } catch (error) {
      Promise.reject(error);
    }
  };

  isAdded = async ID => {
    try {
      let Added = false;
      let UserLocal = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN.USERS);
      Promise.resolve(UserLocal);
      let userLocal = JSON.parse(UserLocal);
      if (userLocal && userLocal.length > 0) {
        userLocal.map(singleUser => {
          if (singleUser.user.id == ID) {
            console.log('Account Already Exist -> ', singleUser.user.username);
            Added = true;
          }
        });
      } else {
        Added = false;
      }
      return Added;
    } catch (error) {
      console.log('error in account service Code - AC1010 -> ', error);
      return Promise.reject(error);
    }
  };

  getAllAccounts = async () => {
    let allAccounts = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN.USERS);
    return JSON.parse(allAccounts);
  };

  removeAccount = async ID => {
    try {
      let newData = [];
      let UserLocal = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN.USERS);
      Promise.resolve(UserLocal);
      let userLocal = JSON.parse(UserLocal);
      if (userLocal && userLocal.length > 1) {
        userLocal.map(singleUser => {
          if (singleUser.user.id != ID) {
            newData.push(singleUser);
          }
        });
        authStore.setUserProfile(newData[0]);
        await AsyncStorage.setItem(
          LOCAL_STORAGE_TOKEN.USERS,
          JSON.stringify(newData),
        );
        
      } else {
        await AsyncStorage.clear();
        authStore.logout();
      }
    } catch (error) {
      console.log('error in account service Code - AC1010 -> ', error);
      return Promise.reject(error);
    }
  };
}
export default new AccountService();
