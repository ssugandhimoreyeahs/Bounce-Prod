import { action, makeAutoObservable, observable, runInAction } from 'mobx';


class AppStore {
    loader = false;

    constructor() {
        makeAutoObservable(this, {
            loader: observable,
            toogleLoader: action
        });
    }

    toogleLoader = (flag = undefined) => {
        runInAction(()=>{
            if (flag) {
                 this.loader = flag;
                 return;
            }
            this.loader = !this.loader;
        });
    }

};

export default AppStore;