import { observable,action, runInAction, makeAutoObservable } from 'mobx';
import Asynctask from './Asynctask';
import { LocalStorage } from "../../../app/utils/localStorage";
class AuthStore{ 
    userProfile = {};
    isAuthenticated = false;
    isAutoLoginDone = false;
    async;
    constructor(rootStore) {  
        makeAutoObservable(this, {
            count: observable,
            userProfile: observable,
            isAuthenticated: observable,
            autoLogin: observable
        });
        this.rootStore = rootStore;
        this.async = new Asynctask(this, rootStore);
        
    } 
    onVendorRegistration = (userProfile) => {
        runInAction(()=>{
            this.isAuthenticated = true;
            this.userProfile = Object.assign({}, userProfile);
        });
    }
    logout = () => {
        runInAction(()=>{
            this.isAuthenticated = false;
            this.userProfile = {};
        });
    }
    onAutoLogin = (userProfile) => {
        runInAction(() => {
            this.userProfile = userProfile;
            this.isAuthenticated = true;
            this.isAutoLoginDone = true;
        });
    }
    onReloadVendor = (user) => {
        runInAction(()=>{
            let nextUserProfile = Object.assign({}, this.userProfile);
            console.log('NEXT_USER_PROFILE_TEST - ', JSON.stringify(nextUserProfile));
            nextUserProfile.user = user;
            this.userProfile = nextUserProfile;
        })
    }
    onUserRegistration = (body) => {
        let userDetailsObj = {
            success: true,
            token: body.accessToken,
            user: body.user
        };
        runInAction(()=>{
            this.userProfile = userDetailsObj;
            this.isAuthenticated = true;
        });
        LocalStorage.onSignUp(body.accessToken, JSON.stringify(body.user));
    }
}

export default AuthStore;