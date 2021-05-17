import ApiClient from '../ApiClient';
import MobxStore from '../../../mobx';

class PartyService {
  createParty = async partyFormData => {
    try {
      const createPartyRes = await ApiClient.authInstance.post(
        ApiClient.endPoints.party,
        partyFormData,
        ApiClient.formDataHeaders(),
      );
      return Promise.resolve(createPartyRes);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getParty = async () => {
    try {
      const parties = await ApiClient.authInstance.get(
        ApiClient.endPoints.party,
        ApiClient.applicationJSONHeader(false),
      );
      console.log('JSON_STR - ', JSON.stringify(parties.data));
      MobxStore.partyStore.setParty(parties.data);
      return Promise.resolve(parties.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

const planParty = new PartyService();
export default planParty;
