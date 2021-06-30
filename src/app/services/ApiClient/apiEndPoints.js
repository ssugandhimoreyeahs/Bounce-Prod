class Server {
  production = 'http://3.12.168.164:3000';
  ngrok = '';
  baseURL = this.production;
}

class Endpoints extends Server {
  getQR = '/user/getqr';
  getAllUser = '/user/all'
  postUser = '/user'; 
  sendRequest = '/user/addFriendRequest'
  acceptRequest = '/user/approveFriendRequest'
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
  tags = '/tags';
  forgotPassword = '/auth/forgotpassword';
  countryCode = '/language/countrycode'
}

export default Object.freeze(new Endpoints());
