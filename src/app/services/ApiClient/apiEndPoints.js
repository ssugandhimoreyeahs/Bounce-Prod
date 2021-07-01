class Server {
  production = 'http://3.12.168.164:3000';
  ngrok = '';
  baseURL = this.production;
}

class Endpoints extends Server {
  cancelFriendRequest = '/user/cancelFriendRequest';
  sendRequest = '/user/addFriendRequest';
  acceptRequest = '/user/approveFriendRequest';
  unFriend ='/user/unfriend';
  denyFriendRequest = '/user/denyFriendRequest';
  relationWithUser = '/user';
  getQR = '/user/getqr';
  getAllUser = '/user/all'
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
  tags = '/tags';
  forgotPassword = '/auth/forgotpassword';
  countryCode = '/language/countrycode'
}

export default Object.freeze(new Endpoints());
