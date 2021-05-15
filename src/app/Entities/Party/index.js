import {MinLength, IsInt, Matches, IsNotEmpty, IsEmpty} from 'class-validator';
import {Decorators as D, ValidationTypes} from '../../Validations';
class Party {
  @IsNotEmpty({message: 'Required title'})
  title;
  @IsNotEmpty({message: 'Required Description'})
  description;

  @IsNotEmpty({message: 'Required Date'})
  date;

  @D.ValidateObjecKey(
    {key: 'addressStr', validation: ValidationTypes.REQUIRED},
    {message: 'Required Address'},
  )
  location = {
    lat: '1',
    lon: '1',
    addressStr: '',
  };
  fee;
  @D.PartyAge('toAge', {message: 'Invalid Minimum Age'})
  fromAge;
  @D.PartyAge('fromAge', {message: 'Invalid Maximum Age'})
  toAge;

  galleryFiles = [];
  needBouncer = false;
  needDJ = false;
  ageLimit = false;
  isPrivate = false;
  profileImageFile;

  constructor(fields) { 
    try {
      if (fields && typeof fields == 'object') {
        Object.keys(this).map(key => {
          this[key] = fields[key];
        });
        this.fromAge = parseInt(fields['fromAge']) || 0;
        this.toAge = parseInt(fields['toAge']) || 0;
        this.fee = parseInt(fields['fee']) || 0;
        if (this.fromAge > 0 && this.toAge > 0) {
          this.ageLimit = true;
        }
        console.log('PARTY_ENTITY_CREATE - ' + JSON.stringify(this));
      }
    } catch (error) {
      console.log('PARTY_ENTITY_ERROR - ', error);
    }
  }
}

export default Party;

// for (let key in fields) {
//   Object.keys(this).map(thisK => {
//     if (key == thisK) {
//       this[key] = fields[key];
//     }
//   });
// }
