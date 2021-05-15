import {action, makeAutoObservable, observable, runInAction, toJS} from 'mobx';
import {CreatePartyDTO} from '../../../app/DTO';
import {Validation} from '../../../app/Validations';

class PlanPartyModel {
  @observable party = new CreatePartyDTO();
  constructor() {
    makeAutoObservable(this);
  }

  static instance;
  static getInstance() {
    if (!this.instance) {
      this.instance = new PlanPartyModel();
    }
    return this.instance;
  }
}
export default PlanPartyModel;
