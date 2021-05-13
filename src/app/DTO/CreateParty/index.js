import {MinLength} from 'class-validator';
class CreatePartyDTO {
  @MinLength(1, {message: 'Required title'})
  title = '';

  @MinLength(1, {message: 'Required Description'})
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

  constructor(props) {
    if (props && Object.keys(props)?.length > 0) {
      Object.keys(props).map(key => {
        this[key] = props[key];
      });
    }
  } 
}

export default CreatePartyDTO;
