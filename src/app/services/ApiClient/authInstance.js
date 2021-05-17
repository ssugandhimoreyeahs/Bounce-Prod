import Instance from './instance';
import MobxStore from '@appMobx';

const AuthInstance = () => {
  const authInstance = Instance();

  authInstance.interceptors.request.use(
    config => {
      config.baseURL = `${authInstance.defaults.baseURL}`;
      config.headers.Authorization = `Bearer ${MobxStore.authStore?.token}`;
      let requestData = {
        url: `${config.baseURL}${config.url}`,
        token: `Bearer ${MobxStore.authStore?.token}`,
        // body: JSON.stringify(config.headers),
      };
      console.log(`

      REQUEST_INIT -> 
      REQUEST_AT - > ${new Date()}
      ${JSON.stringify(requestData)}
      
      `);
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );
  authInstance.interceptors.response.use(
    response => {
      let responseTree = {
        url: `${response?.responseURL}`,
        data: JSON.stringify(response?.data),
      };
      console.log(`

      RESPONSE_INIT <-
      RESPONSE_AT - > ${new Date()}
      ${JSON.stringify(responseTree)}
      
      `);
      return Promise.resolve(response);
    },
    error => {
      const {config, request, response, isAxiosError} = error;
      let responseTreeError = {
        url: `${request?.responseURL}`,
        data: JSON.stringify(response?.data),
        // error: JSON.stringify(error),
      };
      console.log(`

      RESPONSE_ERROR <-
      RESPONSE_ERROR_AT - > ${new Date()}
      ${JSON.stringify(responseTreeError)}
      
      `);
      return Promise.reject(error);
    },
  );
  return authInstance;
};

export default AuthInstance;
