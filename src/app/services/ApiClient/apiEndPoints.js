class Server {
  production = 'http://3.12.168.164:3000';
  ngrok = '';
  baseURL = this.production;
}

class Endpoints extends Server {
  getQR = '/user/getqr';
  postUser = '/user'; 
  getCategory = '/Vendor/Category';
  postUserLogin = '/user/userlogin';
  getVendor = '/vendor/getvendor';
  getUser = '/user'; 
  getCategory = '/Vendor/Category';
  validateVendor = '/auth/validatevendor';
  vendorRegister = '/auth/vendor/register';
  userRegister = 'auth/host/register';
  vendorAddMedia = '/vendor/addmedia';
  postLogin = '/user/userlogin';
  getLanguage = '/language';
  getGenre = '/genres';
  getCertification = '/genres/guardcertification';
  vendorCategory = '/Vendor/Category';
  vendorList = '/vendor'; 
  party = '/party';
}

export default Object.freeze(new Endpoints());
