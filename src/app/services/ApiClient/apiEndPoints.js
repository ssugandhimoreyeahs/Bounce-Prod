class Server {
  production = 'http://3.12.168.164:3000';
  ngrok = '';
  baseURL = this.production;
}

class Endpoints extends Server {
  getQR = '/user/getqr';
  postUser = '/user';
  getCategory = 'Vendor/Category';
}

export default Object.freeze(new Endpoints());
