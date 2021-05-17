import ApiClient from '../ApiClient';

class PlainParty {
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
}

const plainParty = new PlainParty();
export default plainParty;
