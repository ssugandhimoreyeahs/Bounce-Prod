class InvitationModel {
  title = '';
  galleryFiles = [];
  date = new Date();
  location = {
    lat: '',
    long: '',
    addressStr: '',
  };
  description = '';

  constructor(model) {
    if (model) {
      Object.assign(this, model);
    }
  }
  update = obj => {
    return Object.assign({}, this, obj);
  };
}

export default InvitationModel;
