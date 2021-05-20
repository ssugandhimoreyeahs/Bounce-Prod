import ApiClient from '../ApiClient';
import MobxStore from '../../../mobx';

class PartyService {
  createParty = async partyFormData => {
    try {
      MobxStore.appStore.toogleLoader(true);
      const createPartyRes = await ApiClient.authInstance.post(
        ApiClient.endPoints.party,
        partyFormData,
        ApiClient.formDataHeaders(),
      );
      this.getParty();
      return Promise.resolve(createPartyRes);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      MobxStore.appStore.toogleLoader(false);
    }
  };

  getParty = async () => {
    try {
      MobxStore.partyStore.onLoadParty();
      const parties = await ApiClient.authInstance.get(
        ApiClient.endPoints.party,
        ApiClient.applicationJSONHeader(false),
      ); 
      MobxStore.partyStore.setParty(parties.data);
      return Promise.resolve(parties.data);
    } catch (error) {
      MobxStore.partyStore.onLoadParty(false);
      return Promise.reject(error);
    }
  };
}

const planParty = new PartyService();
export default planParty;
