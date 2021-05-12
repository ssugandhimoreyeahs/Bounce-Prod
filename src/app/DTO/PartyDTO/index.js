
function Required(param) {
  console.log("Required decorator_factory executed");
  return function(target, propertyName, description) {
    console.log("TARGET - ", target);
    console.log("PropertyName - ", propertyName);
    console.log(description);
    console.log("Required Decorator executed");
  }
}

class PartyDTO {
 
  title = '';
  galleryFiles = [];
  date = '';
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

export default PartyDTO;
