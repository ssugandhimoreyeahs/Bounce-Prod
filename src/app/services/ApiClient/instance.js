import axios from 'axios';
import Endpoints from './apiEndPoints';

const Instance = () => {
  const instance = axios.create({
    baseURL: Endpoints.baseURL,
  });

  instance.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      console.log('REQUEST ERROR >>> ', error);
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => {
      let responseTree = {
        url: `${response?.responseURL}`,
        data: JSON.stringify(response?.data),
      };
      return Promise.resolve(response);
      //   //console.log(`RESPONSE <<< ${JSON.stringify(responseTree)}`);
      //   //if (response?.status === 200 && response?.data?.success === true) {
      //   if (response?.status === 200) {
      //     return Promise.resolve(response);
      //   } else {
      //     return Promise.reject(response);
      //   }
    },
    error => {
      const {config, request, response, isAxiosError} = error;
      let text;
      let responseTreeError = {
        url: `${request?.responseURL}`,
        data: JSON.stringify(response?.data),
        error: JSON.stringify(error),
      };
      console.log(`RESPONSE ERROR <<< - ${JSON.stringify(responseTreeError)}`);
      //   if (request?.status === 403 || request?.status === 400) {
      //     text = response?.data?.message;
      //   } else {
      //     text = `Server Error Try Again`;
      //   }
      //   // Toast.show({
      //   //   text,
      //   //   duration: 5000,
      //   //   buttonText: 'OK',
      //   // });
      return Promise.reject(error);
    },
  );
  return instance;
};

export default Instance;
