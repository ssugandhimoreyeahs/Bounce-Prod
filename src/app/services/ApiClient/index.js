import AuthInstance from './authInstance';
import Instance from './instance';
import ApiEndPoints from './apiEndPoints';

class ApiClientProvider {
  endPoints = ApiEndPoints;
  instance = Instance();
  authInstance = AuthInstance();
  constructor() {
    this.initializeInstances();
  }

  initializeInstances = () => {
    this.instance = Instance();
    this.authInstance = AuthInstance();
  };
}

let ApiClient = new ApiClientProvider();

export default ApiClient;
