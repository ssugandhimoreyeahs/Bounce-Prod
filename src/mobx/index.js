
import OrientationStore from './Stores/OrientationStore';
import AuthStore from './Stores/AuthStore';
import AppStore from './Stores/AppStore';
import UIStore from './Stores/UiStore';

class MobxStore {

    constructor(props) {
        this.authStore = new AuthStore(this);
        this.orientationStore = new OrientationStore(this);
        this.appStore = new AppStore(this);
        this.uiStore = new UIStore(this);
    }
}
export default new MobxStore();