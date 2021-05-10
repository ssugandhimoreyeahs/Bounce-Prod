import { LocalStorage } from "../../../app/utils/localStorage";
import { postData, BaseURL } from "../../../FetchServices";
import { runInAction } from 'mobx';
import axios from 'axios';

class Asynctask {
    authStore;
    rootStore;
    constructor(authStore, rootStore) {
        this.authStore = authStore;
        this.rootStore = rootStore;
    }
    fetchProfile = async () => {
        try {
            const data = await LocalStorage.getToken();
            const body = data != undefined && data !== null && JSON.parse(data);
            let userLoginResponse = await postData("user/userlogin", body);
            runInAction(() => {
                this.authStore.userProfile = userLoginResponse;
                this.authStore.isAuthenticated = true;
            });
            return Promise.resolve(userLoginResponse);
        } catch (error) {
            return Promise.reject(error);
        }
    };
    login = async (username, password, showLoader = true) => {
        try {
            showLoader && this.rootStore.appStore.toogleLoader(true);
            let body = {
                "username": username,
                "password": password,
            }
            const userLoginResponse = await postData('user/userlogin', body);
            showLoader && this.rootStore.appStore.toogleLoader(false);
            if (userLoginResponse.success == true) {
                console.log('USER_RESPONSE - ', JSON.stringify(userLoginResponse));
                await LocalStorage.storeToken(JSON.stringify(body));
                await LocalStorage.onSignUp(userLoginResponse.token, JSON.stringify(userLoginResponse.user));
                runInAction(() => {
                    this.authStore.userProfile = userLoginResponse;
                    this.authStore.isAuthenticated = true;
                });
                return Promise.resolve(userLoginResponse);
            } else {
                return Promise.reject(userLoginResponse);
            }
        } catch (error) {
            showLoader && this.rootStore.appStore.toogleLoader(false);
            return Promise.reject(error);
        }
    }
    fetchVendor = async (token = undefined) => {
        try {
            let tok = token;
            if (token == undefined) {
                tok = this.authStore.userProfile.token;
            }
            const vendorAutoLoginResponse = await axios(BaseURL + "/vendor/getvendor", {
                headers: {
                    Authorization: `Bearer ${tok}`
                }
            });
            return Promise.resolve(vendorAutoLoginResponse);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    reloadVendor = async () => {
        try { 
            const vendorResponse = await this.fetchVendor();
            console.log('VENDOR_RESPONSE_DATA - ', JSON.stringify(vendorResponse.data));
            if (vendorResponse.status == 200) {
                this.authStore.onReloadVendor(vendorResponse.data);
                return Promise.resolve(vendorResponse.data);
            } else {
                throw new Error(vendorResponse);
            }

        } catch (error) {
            console.log('ERRROR_RELOAD_VENDER - ', error);
            return Promise.reject(error);
        }
    }
    autoLogin = async (showLoader = false) => {
        try {
            showLoader && this.rootStore.appStore.toogleLoader(true);
            const {
                token,
                userDetails
            } = await LocalStorage.autoLogin();
            let userDetailsObjLocal = JSON.parse(userDetails);
            let autoLoginResponse;
            if (userDetailsObjLocal.vendorType == 2) {
                autoLoginResponse = await this.fetchUser(token);
            }else {
                autoLoginResponse = await this.fetchVendor(token);
            } 
            let userDetailsObj = {
                success: true,
                token,
                user: autoLoginResponse.data
            };
            this.authStore.onAutoLogin(userDetailsObj);
            showLoader && this.rootStore.appStore.toogleLoader(false);
            return Promise.resolve(userDetailsObj);
        } catch (error) {
            console.log("LAND_ON_ASYNC_AUTOLOGIN");
            showLoader && this.rootStore.appStore.toogleLoader(false);
            runInAction(() => {
                this.authStore.isAutoLoginDone = true;
            });
            return Promise.reject(error);
        }


    }
    fetchUser = async (token) => {
        try {
            let tok = token;
            if (token == undefined) {
                tok = this.authStore.userProfile.token;
            }
            const userResponse = await axios.get(BaseURL + "/user", {
                headers: {
                    Authorization: `Bearer ${tok}`
                }
            });
            return Promise.resolve(userResponse);
        } catch (error) {
            return Promise.reject(error);
        }
    }

}
export default Asynctask;