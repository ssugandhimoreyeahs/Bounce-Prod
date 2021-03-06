import ApiClient from '../ApiClient';
import MobxStore from '../../../mobx';
import CreateFormData from '../FormData';
import { TagCategory } from '../../Entities';

class PartyService {
  createOrUpdateParty = async (partyFields, partyID = undefined) => {
    try {
      const formData = CreateFormData.objectToFormData(partyFields);
      let endPoint = ApiClient.endPoints.party;
      if (partyID) {
        formData.append('isTagsUpdated', true);
        endPoint = endPoint.concat('/' + partyID);
      }
      console.log(
        'JSON_PARTY_FORM_DATA_edit_check_22 - ',
        JSON.stringify(formData),
      );
      //return false;
      MobxStore.appStore.toogleLoader(true);
      const createPartyRes = await ApiClient.authInstance.post(
        endPoint,
        formData,
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

  getTags = async () => {
    try {
      const Tags = await ApiClient.authInstance.get(
        ApiClient.endPoints.tags,
        ApiClient.applicationJSONHeader(false)
      );
      return Promise.resolve(this.tagsAssign(Tags.data));
    } catch (error) {
      return Promise.reject(error)
    }
  }

  tagsAssign = (Tags) => {
    return Tags.map((tags) => {
      return TagCategory.fromJSON(tags);
    }) || [];
  }
}

const planParty = new PartyService();
export default planParty;
