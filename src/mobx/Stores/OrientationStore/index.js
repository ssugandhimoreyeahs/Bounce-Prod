import { observable,action } from 'mobx';
import { heightPercentageToDP,widthPercentageToDP } from 'react-native-responsive-screen';
import { ORIENTATION_TYPES } from '@constants';
class OrientationStore {

    @observable hp = heightPercentageToDP;
    @observable wp = widthPercentageToDP;
    @observable currentOrientation = ORIENTATION_TYPES.PORTRAIT;
    @action setOrientation(orient){
        if(orient === ORIENTATION_TYPES.PORTRAIT){
            this.hp = heightPercentageToDP;
            this.wp = widthPercentageToDP;
            this.currentOrientation = ORIENTATION_TYPES.PORTRAIT;
        }else{
            this.hp = widthPercentageToDP;
            this.wp = heightPercentageToDP;
            this.currentOrientation = ORIENTATION_TYPES.LANDSCAPE;
        }
    }

}

export default OrientationStore;