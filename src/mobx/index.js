
import OrientationStore from './Stores/OrientationStore';
import AuthStore from './Stores/AuthStore';
import AppStore from './Stores/AppStore';
import UIStore from './Stores/UiStore';
import PartyStore from './Stores/PartyStore';
import TagStore from './Stores/TagStore';

class MobxStore {

    constructor(props) {
        this.authStore = new AuthStore(this);
        this.orientationStore = new OrientationStore(this);
        this.appStore = new AppStore(this);
        this.uiStore = new UIStore(this);
        this.partyStore = new PartyStore(this);
        this.tagStore = new TagStore(this);
    }
}
export default new MobxStore();