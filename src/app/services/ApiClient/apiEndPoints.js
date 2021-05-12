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
}

export default Object.freeze(new Endpoints());
