import { action, makeAutoObservable, observable } from 'mobx';
import {InvitationModel} from '../../../app/models';

class InvitationPartyModel {
    @observable partyFields = new InvitationModel();
    constructor() {
        makeAutoObservable(this);
    }


    @action
    setFields = (obj) => {  
        this.partyFields = this.partyFields.update(obj);
    }


    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new InvitationPartyModel();
        }
        return this.instance;
    }
}
export default InvitationPartyModel;