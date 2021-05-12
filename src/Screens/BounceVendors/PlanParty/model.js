import { action, makeAutoObservable, observable } from 'mobx';
import {PartyDTO} from '../../../app/DTO';

class InvitationPartyModel {
    @observable partyFields = new PartyDTO();
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