import {Decorators as D, DecoratorValidation} from '../../Validations';
class CreatePartyEntity {
  @D.Required({message: 'Required Title'})
  title = '';
  @D.Required({message: 'Required Description'})
  description = '';
  date = '';
  location = '';
  fee = 0;
  needBouncer = false;
  needDJ = false;
  ageLimit = false;
  isPrivate = false;
  profileImageFile = '';
  fromAge = 0;
  toAge = 0;
  galleryFiles = [];
  address = '';
  constructor(dto = {}) {
    const partyDTO = {...dto};
    if (dto && Object.keys(dto).length > 0) {
      Object.keys(this).map(item => {
        if (item == 'galleryFiles') {
          this[item] = partyDTO[item].map(image => image.path);
        } else {
          this[item] = partyDTO[item];
        }
      });
    }
  }
}

export default CreatePartyEntity;
