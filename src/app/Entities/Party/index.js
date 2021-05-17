import {
  MinLength,
  IsInt,
  Matches,
  IsNotEmpty,
  ArrayNotEmpty,
  Min,
} from 'class-validator';
import {Decorators as D, ValidationTypes} from '../../Validations';
class Party {
  @IsNotEmpty({message: 'Required title'})
  title;
  @IsNotEmpty({message: 'Required Description'})
  description;

  @IsNotEmpty({message: 'Required Date'})
  date;

  @D.ValidateObjecKey(
    {key: 'addressStr', [ValidationTypes.REQUIRED]: true},
    {message: 'Required Address'},
  )
  location = {
    lat: '1',
    lon: '1',
    addressStr: '',
  };

  @Min(1, {message: 'Required Price'})
  fee;

  @D.PartyAge('toAge', {message: 'Invalid Minimum Age'})
  fromAge;
  @D.PartyAge('fromAge', {message: 'Invalid Maximum Age'})
  toAge;

  @Min(1, {message: 'Required Quantity'})
  quantityAvailable;

  @ArrayNotEmpty({message: 'Required Event Media'})
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
        this.quantityAvailable = parseInt(fields['quantityAvailable']) || 0;
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
